"use client";

import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import NextLink from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:px-6 lg:pt-32 lg:pb-28">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Icon icon="solar:magic-stick-3-bold" className="text-base" />
            AI-Powered Document Builder
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Create stunning{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            presentations
          </span>{" "}
          in minutes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60"
        >
          Transform your ideas into polished documents and presentations with
          AI. Just describe what you need, and watch it come to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            as={NextLink}
            href="/sign-up"
            color="primary"
            size="lg"
            className="font-semibold"
            endContent={<Icon icon="solar:arrow-right-linear" />}
          >
            Start Building Free
          </Button>
          <Button
            as="a"
            href="#how-it-works"
            variant="bordered"
            size="lg"
            startContent={<Icon icon="solar:play-circle-linear" />}
          >
            See How It Works
          </Button>
        </motion.div>

        {/* App preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="rounded-xl border border-default-200 bg-content1 p-2 shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-1.5 border-b border-default-200 px-3 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-danger/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
              <span className="ml-2 text-xs text-foreground/40">
                PDF Studio — Annual Report 2025
              </span>
            </div>
            <div className="grid grid-cols-[200px_1fr] gap-0">
              <div className="border-r border-default-200 p-4">
                <div className="mb-3 h-3 w-20 rounded bg-default-200" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg bg-default-100 p-2"
                    >
                      <div className="h-8 w-6 rounded bg-default-200" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-full rounded bg-default-200" />
                        <div className="h-2 w-2/3 rounded bg-default-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center p-8">
                <div className="w-full space-y-4">
                  <div className="h-4 w-3/4 rounded bg-default-200" />
                  <div className="h-3 w-full rounded bg-default-100" />
                  <div className="h-3 w-full rounded bg-default-100" />
                  <div className="h-3 w-5/6 rounded bg-default-100" />
                  <div className="mt-6 h-32 w-full rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10" />
                  <div className="h-3 w-full rounded bg-default-100" />
                  <div className="h-3 w-2/3 rounded bg-default-100" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
