"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";

export default function CTASection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-default-50 border border-default-200 p-10 text-center sm:p-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to create something?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-foreground/50">
          Join thousands of creators using PDF Studio to build documents with
          AI.
        </p>
        <div className="mt-8">
          <Button
            as={NextLink}
            href="/sign-in"
            color="primary"
            size="lg"
            radius="full"
            className="font-medium px-8"
            endContent={<Icon icon="solar:arrow-right-linear" />}
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}
