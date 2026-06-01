export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'All fields are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. Read the receiver email from keystatic contact config
    let receiverEmail = 'hello@wijayapartners.com';
    try {
      const configPath = path.join(process.cwd(), 'src/content/contact/index.json');
      if (fs.existsSync(configPath)) {
        const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        if (configData.receiverEmail) {
          receiverEmail = configData.receiverEmail;
        }
      }
    } catch (err) {
      console.error('Error reading contact config:', err);
    }

    // 2. Save the inquiry locally as a JSON file for Keystatic
    const date = new Date();
    const timestamp = date.getTime();
    const dateString = date.toISOString();
    const id = `${timestamp}-${Math.random().toString(36).substring(2, 8)}`;
    
    const inquiryData = {
      id,
      name,
      email,
      subject,
      message,
      date: dateString
    };

    const inquiriesDir = path.join(process.cwd(), 'src/content/inquiries');
    if (!fs.existsSync(inquiriesDir)) {
      fs.mkdirSync(inquiriesDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(inquiriesDir, `${id}.json`),
      JSON.stringify(inquiryData, null, 2),
      'utf-8'
    );

    // 3. Send email via Resend if API key is present
    const resendApiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
    const resendFromEmail = import.meta.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'Wijaya Partners Inquiries <onboarding@resend.dev>';
    let emailSent = false;
    let emailError = null;

    if (resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: resendFromEmail,
            to: receiverEmail,
            subject: `[Contact Form] ${subject}`,
            html: `
              <h2>New Inquiry from Wijaya Partners Website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="background: #f4f4f5; padding: 15px; border-left: 4px solid #ef4444; border-radius: 4px;">
                ${message.replace(/\n/g, '<br/>')}
              </blockquote>
              <hr/>
              <p style="font-size: 12px; color: #71717a;">Submitted at: ${dateString}</p>
            `
          })
        });

        if (response.ok) {
          emailSent = true;
        } else {
          const errBody = await response.json();
          emailError = errBody;
          console.error('Resend API returned error:', errBody);
        }
      } catch (err) {
        console.error('Failed to send email via Resend:', err);
        emailError = err instanceof Error ? err.message : String(err);
      }
    } else {
      console.log(`[Simulation] No RESEND_API_KEY set. In local mode, inquiry saved to CMS, and would send email to: ${receiverEmail}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Inquiry submitted successfully.',
        savedLocally: true,
        emailSent,
        emailError
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error handling contact submission:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
