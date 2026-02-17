import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
}
