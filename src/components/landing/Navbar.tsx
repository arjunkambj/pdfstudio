"use client";

import Logo from "@/components/common/Logo";
import { Icon } from "@iconify/react";
import {
  Button,
  Link,
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import NextLink from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      isBlurred
      isBordered
      classNames={{
        wrapper: "px-4 sm:px-6",
      }}
    >
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent className="hidden gap-6 sm:flex" justify="center">
        {navLinks.map((link) => (
          <NavbarItem key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            as={NextLink}
            href="/sign-in"
            variant="light"
            size="sm"
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={NextLink}
            href="/sign-up"
            color="primary"
            size="sm"
            endContent={<Icon icon="solar:arrow-right-linear" />}
          >
            Get Started
          </Button>
        </NavbarItem>
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      <NavbarMenu>
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.href}>
            <Link
              href={link.href}
              className="w-full text-foreground"
              size="lg"
              onPress={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link as={NextLink} href="/sign-in" className="w-full" size="lg">
            Sign In
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
}
