"use client";

import {
  Button,
  Navbar as HeroNavbar,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useState } from "react";
import Logo from "@/components/common/Logo";

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
      isBlurred={false}
      position="sticky"
      classNames={{
        base: "bg-transparent border-none pt-4",
        wrapper: "bg-content2 rounded-full px-10 ",
      }}
    >
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent className="hidden gap-12 sm:flex" justify="center">
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
        <NavbarItem>
          <Button
            as={NextLink}
            href="/sign-in"
            color="primary"
            size="md"
            radius="full"
            endContent={<Icon icon="solar:arrow-right-linear" />}
          >
            Get Started
          </Button>
        </NavbarItem>
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      <NavbarMenu className="bg-background/80 backdrop-blur-xl mt-2 rounded-xl border border-default-200">
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
