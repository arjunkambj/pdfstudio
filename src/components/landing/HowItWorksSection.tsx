"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    icon: "solar:document-add-bold-duotone",
    title: "Start a project",
    description:
      "Create a new project or pick a template. Give your document a name and describe what you want to build.",
  },
  {
    step: 2,
    icon: "solar:magic-stick-3-bold-duotone",
    title: "Generate with AI",
    description:
      "Let AI draft your content, design your layout, and generate visuals — all from a simple prompt.",
  },
  {
    step: 3,
    icon: "solar:share-circle-bold-duotone",
    title: "Export & share",
    description:
      "Download as PDF or presentation, or share a live link with your team for instant collaboration.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-foreground/60">
            Three simple steps to create professional documents
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-12">
          {/* Connector line */}
          <div className="absolute top-12 right-16 left-16 hidden h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 md:block" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-default-200 bg-content1">
                <Icon
                  icon={s.icon}
                  className="text-3xl text-primary"
                />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {s.step}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/60">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
