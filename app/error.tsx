"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to console or send to monitoring/analytics
    console.error("Global error boundary:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          An unexpected error occurred. You can try reloading the page or go back to the homepage.
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 text-left p-3 rounded max-h-40 overflow-auto mb-4 text-sm">
          {error?.message}
        </pre>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              try {
                reset();
              } catch (_) {
                router.refresh();
              }
            }}
            className="px-4 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Home
          </button>
        </div>
      </div>
    </main>
  );
}
