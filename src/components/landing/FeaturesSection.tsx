"use client";

import { Icon } from "@iconify/react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "solar:magic-stick-3-bold-duotone",
    title: "AI Generation",
    description:
      "Describe your document and let AI create professional presentations, reports, and decks in seconds.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: "solar:pen-new-square-bold-duotone",
    title: "Smart Editing",
    description:
      "Edit with precision tools — resize, reorder, style, and refine every element of your document.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: "solar:users-group-rounded-bold-duotone",
    title: "Team Collaboration",
    description:
      "Share projects with your team, leave comments, and collaborate on documents in real-time.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: "solar:gallery-bold-duotone",
    title: "Beautiful Templates",
    description:
      "Start from professionally designed templates or let AI suggest the perfect layout for your content.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: "solar:export-bold-duotone",
    title: "Export Anywhere",
    description:
      "Export as PDF, PPTX, or share a live link. Your documents look perfect on any device.",
    color: "text-danger",
    bg: "bg-danger/10",
  },
  {
    icon: "solar:shield-check-bold-duotone",
    title: "Secure & Private",
    description:
      "Enterprise-grade security with encrypted storage. Your documents and data stay private.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to create
          </h2>
          <p className="mt-4 text-lg text-foreground/60">
            Powerful tools that make document creation effortless
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card
                className="border border-default-200 bg-content1/50 backdrop-blur-sm"
                shadow="none"
              >
                <CardBody className="gap-3 p-6">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg}`}
                  >
                    <Icon
                      icon={feature.icon}
                      className={`text-2xl ${feature.color}`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/60">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
