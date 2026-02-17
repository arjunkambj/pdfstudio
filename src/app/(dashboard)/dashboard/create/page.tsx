"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const createOptions = [
  {
    key: "text",
    title: "Paste text",
    description:
      "Let AI segment your text into slide cards without changing core meaning",
    icon: "solar:clipboard-text-bold-duotone",
    href: "/dashboard/create/text",
  },
  {
    key: "images",
    title: "Import images",
    description: "Upload up to 30 images, extract text, and build slides",
    icon: "solar:gallery-bold-duotone",
    href: "/dashboard/create/images",
  },
];

export default function CreatePage() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Create new</h1>
        <p className="mt-2 text-default-400">
          Choose how you want to start building
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {createOptions.map((option) => (
          <Card
            key={option.key}
            as={Link}
            href={option.href}
            isPressable
            className="transition-shadow hover:shadow-md"
          >
            <CardBody className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Icon icon={option.icon} className="text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{option.title}</h3>
              <p className="text-sm text-default-400">{option.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button
          as={Link}
          href="/dashboard"
          variant="light"
          startContent={
            <Icon icon="solar:arrow-left-linear" className="text-lg" />
          }
        >
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}
