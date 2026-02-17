"use client";

import { Card, CardBody, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function InstructionsPanel({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4">
      <h3 className="text-sm font-semibold text-default-500 uppercase">
        Instructions
      </h3>

      <Textarea
        label="Additional instructions"
        placeholder="e.g. Focus on ROI metrics, include competitor analysis..."
        value={value}
        onValueChange={onChange}
        minRows={6}
        maxRows={12}
      />

      <Card className="bg-default-50">
        <CardBody className="gap-2 p-3">
          <div className="flex items-center gap-2">
            <Icon
              icon="solar:lightbulb-bolt-bold-duotone"
              className="text-base text-warning"
            />
            <span className="text-xs font-medium">Tips</span>
          </div>
          <ul className="list-inside list-disc text-xs text-default-500 space-y-1">
            <li>Be specific about tone and audience</li>
            <li>Mention any data points to include</li>
            <li>Specify the desired length per card</li>
            <li>Reference any brand guidelines</li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
