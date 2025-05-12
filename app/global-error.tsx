"use client";

import NextError from "next/error";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  // Log the error to the console in development
  console.error("Global error caught:", error);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong!</h1>
          <p className="text-lg mb-6">The application encountered an unexpected error.</p>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-100 p-4 rounded-lg text-left max-w-2xl overflow-auto">
              <p className="font-semibold">{error.message}</p>
              {error.stack && (
                <pre className="text-sm mt-2 text-red-800 whitespace-pre-wrap">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
          <a
            href="/"
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </body>
    </html>
  );
}