"use client";

import { useState } from "react";
import { TransactionDetailModal, type Transaction } from "@/app/(logged)/_components/TransactionDetailModal";
import { TransactionList } from "@/app/(logged)/_components/TransactionList";
import { useTransactions } from "@/contexts/Transactions";

export function RecentTransactionsCard() {
  const { transactions } = useTransactions();
  const [activeTx, setActiveTx] = useState<Transaction | null>(null);

  return (
    <>
      <aside className="bg-white rounded-md p-6">
        <h2 className="text-lg font-bold mb-5">Últimas transações</h2>
        <TransactionList items={transactions} onSelect={setActiveTx} />
      </aside>

      <TransactionDetailModal
        transaction={activeTx}
        onClose={() => setActiveTx(null)}
      />
    </>
  );
}
