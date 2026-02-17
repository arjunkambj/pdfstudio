"use client";

import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useStackApp, useUser } from "@stackframe/stack";

export default function SignInPage() {
  const app = useStackApp();
  const user = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  async function handleMagicLink(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await app.sendMagicLinkEmail(email);

      if (result.status === "error") {
        setError("Could not send the link. Please try again.");
      } else {
        setIsSent(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogle() {
    await app.signInWithOAuth("google");
  }

  if (isSent) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
          <Icon icon="solar:letter-bold" className="text-xl text-success" />
        </div>
        <h2 className="text-lg font-bold">Check your email</h2>
        <p className="text-sm text-default-500">
          We sent a login link to{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSent(false);
            setEmail("");
          }}
          className="text-sm text-primary hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-default-500">
          Sign in to continue to PDF Studio
        </p>
      </div>

      <Button
        variant="flat"
        className="border-divider"

        startContent={<Icon icon="logos:google-icon" className="text-base" />}
        onPress={handleGoogle}
        fullWidth
        size="md"
      >
        Continue with Google
      </Button>

      <div className="flex items-center gap-3">
        <Divider className="flex-1" />
        <span className="text-xs text-default-400">or</span>
        <Divider className="flex-1" />
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
        <Input
          type="email"
          placeholder="Enter email address"
          value={email}
          onValueChange={setEmail}
          isRequired
          variant="flat"
          size="md"
          classNames={{
            inputWrapper: "border-divider",
          }}
        />

        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
          fullWidth
          size="md"
        >
          Continue
        </Button>
      </form>

      <p className="text-center text-xs text-default-400">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
