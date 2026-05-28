"use client";

import { useEffect, useRef } from "react";
import { useTransactions } from "@/contexts/Transactions";
import type { Props } from "./types";

function toDisplayDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

/**
 * Wraps bb-new-transaction-modal.
 *
 * The WC is only mounted when `open` is true so that its internal bb-modal
 * (which uses position:fixed on :host) never blocks events while the modal
 * is closed. This is a defense-in-depth measure alongside the DS fix that
 * adds display:none to :host(:not([open])).
 */
export function NewTransactionModal({ open, onClose }: Props) {
  const { addTransaction } = useTransactions();
  const ref = useRef<HTMLElement>(null);

  const addTransactionRef = useRef(addTransaction);
  addTransactionRef.current = addTransaction;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const el = ref.current as any;
    if (!el) return;

    // Set open immediately so Lit renders the backdrop on this paint
    el.open = true;

    const handleSubmit = (e: Event) => {
      const { type, amount, date } = (e as CustomEvent).detail as {
        type: string;
        amount: number;
        date: string; // YYYY-MM-DD from the WC
      };
      addTransactionRef.current({
        type,
        amount,
        date: toDisplayDate(date),
      });
    };

    const handleClose = () => onCloseRef.current();

    el.addEventListener("submit", handleSubmit);
    el.addEventListener("close", handleClose);
    return () => {
      el.removeEventListener("submit", handleSubmit);
      el.removeEventListener("close", handleClose);
    };
  }, []);

  // Only mount the WC when the modal should be visible.
  // This prevents bb-modal's position:fixed :host from blocking page events.
  if (!open) return null;

  return <bb-new-transaction-modal ref={ref} />;
}
