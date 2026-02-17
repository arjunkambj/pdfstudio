"use client";

import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function CardByCardTip() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardBody className="gap-2 p-4">
        <div className="flex items-center gap-2">
          <Icon
            icon="solar:lightbulb-bolt-bold-duotone"
            className="text-lg text-primary"
          />
          <span className="text-sm font-medium">Card-by-card tip</span>
        </div>
        <p className="text-xs text-default-500">
          Use blank lines to separate sections. Each section will become its own
          card in the final output. The first line of each section becomes the
          card title.
        </p>
      </CardBody>
    </Card>
  );
}
