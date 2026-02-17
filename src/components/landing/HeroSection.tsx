"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import NextLink from "next/link";

export default function HeroSection() {
  return (
    <section className="relative px-4 pt-32 pb-24 sm:px-6 lg:pt-40 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/[0.03] to-transparent" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-default-200 bg-default-100 px-3 py-1 text-xs font-medium text-foreground/60">
            <Icon icon="solar:magic-stick-3-bold" className="text-primary" />
            AI-Powered Document Builder
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Create stunning documents
          <br className="hidden sm:block" />
          in minutes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-foreground/50"
        >
          Describe what you need. AI builds it. Export and share instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
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
          <Button
            as={Link}
            href="/sign-in"
            variant="bordered"
            size="lg"
            radius="full"
            className="px-8"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
