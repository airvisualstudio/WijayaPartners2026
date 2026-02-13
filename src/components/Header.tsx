import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { withBase } from "@/lib/utils";

import logoDefault from "@/assets/logo-wijaya.svg";

interface HeaderProps {
  logo?: string;
}

export function Header({ logo = logoDefault.src }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: withBase("/#about") },
    { label: "Our Teams", href: withBase("/#teams") },
    { label: "Our Projects", href: withBase("/#projects") },
    { label: "Contact", href: withBase("/contact") },
  ];

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 flex flex-col items-center ${isScrolled ? "gap-0" : "gap-4"} px-4 transition-all duration-300 transform`}
    >
      {/* Logo - Centered and Upsized */}
      {/* Logo - Centered and Upsized */}
      <a
        href={withBase("/")}
        className={`flex items-center space-x-3 hover:opacity-90 transition-all duration-300 origin-center ${isScrolled ? "h-0 opacity-0 overflow-hidden scale-0 mb-0" : "h-20 opacity-100 scale-100"
          }`}
      >
        <img src={logo} alt="Wijaya Partners Logo" className="h-full w-auto" />
      </a>

      <nav className="relative container max-w-5xl rounded-full border bg-background/60 backdrop-blur-sm shadow-lg h-16 flex items-center justify-between px-6 w-full">
        {/* Empty div to maintain spacing if needed, but justify-between with 1 item pushes it to start/end? */}
        {/* We want Actions on the right. With 1 item, justify-between makes it start. */}
        {/* Let's add an empty div as spacer on the left */}
        <div className="w-20 hidden md:block"></div>

        {/* Desktop Navigation - Absolute Centered */}
        <div className="hidden md:flex items-center space-x-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-auto md:ml-0">
          <ThemeToggle />
          {/* <Button className="hidden md:inline-flex rounded-full">
            Contact Us
          </Button> */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-36 left-4 right-4 rounded-2xl border bg-background/80 backdrop-blur-xl shadow-xl p-4 md:hidden">
          <div className="space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {/* <Button className="w-full rounded-full">Contact Us</Button> */}
          </div>
        </div>
      )}
    </header>
  );
}
