"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTransactions } from "@/contexts/Transactions";
import type { Transaction } from "@/app/(logged)/_components/TransactionDetailModal/types";
import { setMaxDateInputInShadow } from "@/lib/webcomponent";

const MAX_ITEMS = 7;

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
    // Set props — element is always open while mounted
    el.transaction = transaction;
    el.open = true;
    setMaxDateInputInShadow(el);

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

export function RecentTransactionsCard() {
  const { transactions, updateTransaction, deleteTransaction } =
    useTransactions();
  const [activeTx, setActiveTx] = useState<Transaction | null>(null);

  const listRef = useRef<HTMLElement>(null);

  const hasMore = transactions.length > MAX_ITEMS;

  // Sync items array to bb-transaction-list via DOM property (limitado a 7)
  useEffect(() => {
    const el = listRef.current as any;
    if (el) el.items = transactions.slice(0, MAX_ITEMS);
  }, [transactions]);

  // Wire transaction-select on bb-transaction-list
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
      <aside className="bg-white rounded-md p-6 flex flex-col self-stretch">
        <h2 className="text-lg font-bold mb-5">Últimas transações</h2>
        <bb-transaction-list ref={listRef} />
        {hasMore && (
          <div className="mt-auto pt-4 border-t border-gray-100 text-center">
            <Link
              href="/extrato"
              className="text-sm font-semibold text-[var(--bb-primary,#374C34)] hover:underline"
            >
              Ver todas as transações no extrato →
            </Link>
          </div>
        )}
      </aside>

      {/* Only mount the detail modal WC when a transaction is selected,
          so bb-modal's position:fixed :host never blocks the page. */}
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
