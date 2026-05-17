"use client";

import { useState } from "react";
import { TransactionDetailModal, type Transaction } from "@/app/(logged)/_components/TransactionDetailModal";
import { TransactionList } from "@/app/(logged)/_components/TransactionList";
import { useTransactions } from "@/contexts/Transactions";
import { groupByMonth } from "./helpers";

export default function ExtratoView() {
  const { transactions } = useTransactions();
  const [activeTx, setActiveTx] = useState<Transaction | null>(null);
  const months = groupByMonth(transactions);

  return (
    <>
      <main className="bg-white/60 rounded-md p-10 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center mb-8">Extrato</h1>
        <div className="flex flex-col gap-6">
          {months.map((month) => (
            <section key={month.label}>
              <h2 className="text-sm font-semibold text-emerald-600 mb-4">
                {month.label}
              </h2>
              <TransactionList
                items={month.transactions}
                onSelect={setActiveTx}
                showDividers
                showDescription
              />
            </section>
          ))}
        </div>
      </main>

      <TransactionDetailModal
        transaction={activeTx}
        onClose={() => setActiveTx(null)}
      />
    </>
  );
}
