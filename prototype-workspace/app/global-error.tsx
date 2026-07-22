"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="error-page">
          <h2>Something went wrong!</h2>
          <p>{error.message || "A critical error occurred"}</p>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  );
}
