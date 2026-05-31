"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTransactions } from "@/contexts/Transactions";

function toDisplayDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function NovaTransacaoForm() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const ref = useRef<HTMLElement>(null);

  // Stable ref so the effect closure never goes stale
  const addTransactionRef = useRef(addTransaction);
  addTransactionRef.current = addTransaction;

  useEffect(() => {
    const el = ref.current as any;
    if (!el) return;

    const handleSubmit = (e: Event) => {
      const { type, amount, date, agency, account, pixKey } = (e as CustomEvent).detail as {
        type: string;
        amount: number;
        date: string; // YYYY-MM-DD from the WC date input
        agency?: string;
        account?: string;
        pixKey?: string;
      };
      addTransactionRef.current({ type, amount, date: toDisplayDate(date), agency, account, pixKey });
      router.push("/home");
    };

    const handleCancel = () => router.push("/home");

    el.addEventListener("submit", handleSubmit);
    el.addEventListener("cancel", handleCancel);
    return () => {
      el.removeEventListener("submit", handleSubmit);
      el.removeEventListener("cancel", handleCancel);
    };
  }, []); // runs once on mount — element is always in DOM at this point

  return (
    <main className="bg-white/60 rounded-md p-8 md:p-10 w-full max-w-2xl">
      <h1 className="text-2xl font-bold text-center mb-8">Nova transação</h1>
      <bb-new-transaction-list ref={ref} />
    </main>
  );
}
