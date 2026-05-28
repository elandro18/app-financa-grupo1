"use client";

// variant="secondary" → transparent bg + coloured border (outline style).
// --bb-secondary scoped inline so only this button's shadow root gets
// the amber colour; other secondary buttons on the page are unaffected.
import React from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  return (
    <bb-button
      label="Sair"
      variant="secondary"
      size="md"
      style={{
        "--bb-secondary":       "var(--bb-warning, #f59e0b)",
        "--button-hover-bg":    "var(--bb-primary, #374C34)",
        "--button-hover-color": "var(--bb-warning, #f59e0b)",
      } as React.CSSProperties}
      onClick={() => router.push("/")}
    />
  );
}
