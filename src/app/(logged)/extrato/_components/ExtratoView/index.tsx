"use client";

import { useState, useRef, useEffect } from "react";
import { useTransactions } from "@/contexts/Transactions";
import type { Transaction } from "@/app/(logged)/_components/TransactionDetailModal/types";

/**
 * Thin wrapper that bridges bb-transaction-detail-modal with React context.
 * Rendered only when activeTx is set — keeps bb-modal out of the DOM when closed.
 */
function DetailModal({
  transaction,
  onSave,
  onDelete,
  onClose,
}: {
  transaction: Transaction;
  onSave: (id: string, description: string, amount: number, date: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;
  const onDeleteRef = useRef(onDelete);
  onDeleteRef.current = onDelete;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const el = ref.current as any;
    if (!el) return;
    el.transaction = transaction;
    el.open = true;

    const handleSave = (e: Event) => {
      const { id, description, amount, date } = (e as CustomEvent).detail;
      onSaveRef.current(id, description, amount, date);
    };
    const handleDelete = (e: Event) => {
      onDeleteRef.current((e as CustomEvent).detail.id);
    };
    const handleClose = () => onCloseRef.current();

    el.addEventListener("save", handleSave);
    el.addEventListener("delete", handleDelete);
    el.addEventListener("close", handleClose);
    return () => {
      el.removeEventListener("save", handleSave);
      el.removeEventListener("delete", handleDelete);
      el.removeEventListener("close", handleClose);
    };
  }, [transaction]);

  return <bb-transaction-detail-modal ref={ref} />;
}

export default function ExtratoView() {
  const { transactions, updateTransaction, deleteTransaction } =
    useTransactions();
  const [activeTx, setActiveTx] = useState<Transaction | null>(null);

  const listRef = useRef<HTMLElement>(null);

  // Sync items — bb-transaction-list will group them by month
  useEffect(() => {
    const el = listRef.current as any;
    if (el) el.items = transactions;
  }, [transactions]);

  // transaction-select on the list
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const handler = (e: Event) =>
      setActiveTx((e as CustomEvent<Transaction>).detail);
    el.addEventListener("transaction-select", handler);
    return () => el.removeEventListener("transaction-select", handler);
  }, []);

  const handleSave = (id: string, description: string, amount: number, date: string) => {
    updateTransaction(id, { description, amount, date });
    setActiveTx(null);
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    setActiveTx(null);
  };

  return (
    <>
      <main className="bg-white/60 rounded-md p-10 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center mb-8">Extrato</h1>
        {/* group-by-month handled entirely inside bb-transaction-list */}
        <bb-transaction-list ref={listRef} group-by-month={true} />
      </main>

      {/* Only mount when a transaction is selected */}
      {activeTx && (
        <DetailModal
          transaction={activeTx}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setActiveTx(null)}
        />
      )}
    </>
  );
}
