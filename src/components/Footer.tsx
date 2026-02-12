import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withBase } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 z-50 relative">
      <div className="container mx-auto px-4 py-4">
        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Wijaya Partners. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* <a
              href={withBase("/privacy")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a> */}
            {/* <a
              href={withBase("/terms")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a> */}
            {/* <a
              href={withBase("/privacy#cookies")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
