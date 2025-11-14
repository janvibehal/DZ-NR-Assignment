"use client";

import Link from "next/link";

export default function GlobalErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          The application experienced an unexpected error. You can reload the
          page or return to the home screen.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => location.reload()}
            className="px-4 py-2 border rounded bg-white"
          >
            Reload
          </button>

          <Link href="/" className="px-4 py-2 rounded bg-blue-600 text-white">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
