"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * The Prototypes list now lives at the root route ("/"). This route is kept as
 * a redirect so existing in-app links to "/workspace" continue to work.
 */
export default function WorkspaceRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
