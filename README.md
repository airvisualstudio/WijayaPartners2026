# Wijaya & Partners - Web Platform

<div align="center">
  <p><strong>Absolute Loyalty. Strategic Action.</strong></p>
  <p>Dedicated legal guardian for local enterprises and global partners base in Bandung, Indonesia.</p>
</div>

---

## 🏛️ Project Overview
This is the official web platform for the **Wijaya & Partners** law firm. The application features a sophisticated corporate presentation website, dynamic team profile pages, a client logo marquee system, and a contact system connected to a headless Git-based CMS.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **[Astro](https://astro.build/)** | Node-adapter-based SSR framework optimized for performance and content delivery. |
| **UI Library** | **[React](https://react.dev/)** | Used for interactive components (e.g. Hero, Headers, Client Logos, Forms). |
| **CMS** | **[Keystatic](https://keystatic.com/)** | Git-based, local-first headless CMS for editing pages, team profiles, and client logos. |
| **Styling** | **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first styling including support for theme switching (light/dark mode). |
| **Animations** | **[Framer Motion](https://www.framer.com/motion/)** | Powering modern hover states, marquee flows, and page transitions. |
| **Icons** | **[Lucide React](https://lucide.dev/)** | Cohesive, modern outline vector icon pack. |
| **Deployment** | **Node.js standalone** | Run as a dynamic server (SSR mode) allowing API handlers to write data. |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (included with Node.js)

### Local Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a file named **`.env`** (lowercase) at the root of the project. Configure the following variables:
   ```env
   # ngrok Authtoken for exposing local port to public internet
   NGROK_AUTHTOKEN=your_ngrok_authtoken_here

   # Resend Email Service Key
   RESEND_API_KEY=your_resend_api_key_here

   # (Optional) Custom sender email once domain is verified on Resend
   RESEND_FROM_EMAIL=Wijaya Partners <inquiries@wijayapartners.com>
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The local website will be accessible at: **`http://localhost:4321`**.

4. **Start the Public Tunnel (ngrok)**:
   To share the active development server with external testers:
   ```bash
   node tunnel.js
   ```
   It will output the public URL established at: `https://xxxx.ngrok-free.dev`.

---

## 🏛️ Headless CMS Access (Keystatic)

Keystatic acts as a local-first headless CMS that writes markdown and JSON data directly into the Git repository.

### How to Access Keystatic
Ensure your local server is running (`npm run dev`) and visit:
👉 **`http://localhost:4321/keystatic`**

### CMS Schema Collections & Singletons
1. **Homepage** (Singleton): Edit hero headings, subheading, and the background image.
2. **Settings** (Singleton): Manage the company logo image.
3. **Contact Page** (Singleton): Edit business phone, email, office hours, address, Google Maps embed url, and the **Receiver Email Address** for the contact form.
4. **Teams** (Collection): Add, edit, or delete lawyer profiles including name, position, profile image, email, LinkedIn, education background, area of expertise, and detailed bio.
5. **Clients** (Collection): Manage partner/client logos showing on the projects page.
6. **Inquiries** (Collection): Read-only view of contact messages submitted by website visitors.

---

## 📬 Contact Form & Email Integration

The contact form on the `/contact` page is fully dynamic:

- **Endpoint**: `/api/contact` (Runs dynamically server-side).
- **Submissions**: Writes submitted inquiries locally as JSON files inside `src/content/inquiries/`. These are automatically formatted to display in the **Inquiries** section of your Keystatic CMS dashboard.
- **Email Forwarding**: Uses the **Resend API** to forward incoming messages in real-time to the **Receiver Email** configured in the Keystatic Contact panel.
  
> [!IMPORTANT]
> **Resend Sandbox Limitation**: If you use Resend's default onboarding sender (`onboarding@resend.dev`), you can only receive emails on the address you used to register the Resend account. To send to any company email (like `hello@wijayapartners.com`), you must verify your domain (`wijayapartners.com`) on your Resend account dashboard.

---

## 📁 Key Directories & Files

- `src/pages/` — Routing structure of the website.
  - `src/pages/index.astro` — Homepage.
  - `src/pages/projects.astro` — Client and projects showcase.
  - `src/pages/teams/index.astro` — Lawyers directory.
  - `src/pages/teams/[slug].astro` — Lawyers detail pages.
  - `src/pages/contact.astro` — Form and address details.
  - `src/pages/api/contact.ts` — Server route for contact form inquiries.
- `src/content/` — Markdown/JSON data edited by Keystatic.
- `src/assets/` — Images and team portrait directories.
- `scripts/migrate-clients.cjs` — Auto-seeding script for migrating client logo files.
- `tunnel.js` — Script to spawn ngrok tunnels on port `4321`.

---

## 🧪 Production Verification

To bundle the application for production hosting (Node.js SSR):
```bash
npm run build
```

To preview the compiled production bundle locally:
```bash
npm run preview
```
