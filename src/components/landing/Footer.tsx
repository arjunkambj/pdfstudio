"use client";

import Logo from "@/components/common/Logo";
import { Divider, Link } from "@heroui/react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="px-4 pb-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Divider className="mb-8" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-foreground/50">
              AI-powered document builder for modern teams.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-3 text-sm font-semibold">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Divider className="my-8" />
        <p className="text-center text-xs text-foreground/40">
          &copy; {new Date().getFullYear()} PDF Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
