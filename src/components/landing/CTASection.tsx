"use client";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import NextLink from "next/link";

export default function CTASection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 p-10 text-center sm:p-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to create something amazing?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/60">
          Join thousands of creators using PDF Studio to build beautiful
          documents and presentations with AI.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            as={NextLink}
            href="/sign-up"
            color="primary"
            size="lg"
            className="font-semibold"
            endContent={<Icon icon="solar:arrow-right-linear" />}
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}
