import Logo from "@/components/common/Logo";

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left — Visual panel (hidden on mobile) */}
      <div className="relative hidden lg:flex lg:w-1/2 items-end bg-content1 p-12">
        <div className="max-w-sm">
          <h2 className="text-2xl font-bold tracking-tight">
            Build beautiful documents with AI.
          </h2>
          <p className="mt-2 text-sm text-default-500">
            Describe your idea. Get a polished result in seconds.
          </p>
        </div>
      </div>

      {/* Right — Auth form */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
