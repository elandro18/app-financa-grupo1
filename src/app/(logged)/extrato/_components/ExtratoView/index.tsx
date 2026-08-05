"use client";

import { useState, useRef, useEffect } from "react";
import { useTransactions } from "@/contexts/Transactions";
import type { Transaction } from "@/app/(logged)/_components/TransactionDetailModal/types";
import { setMaxDateInputInShadow } from "@/lib/webcomponent";

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

export default function ExtratoView() {
  const { transactions, updateTransaction, deleteTransaction } =
    useTransactions();
  const [activeTx, setActiveTx] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const listRef = useRef<HTMLElement>(null);

  // Filter transactions by description when searching
  const filtered = searchTerm
    ? transactions.filter((t) =>
        (t.description ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    : transactions;

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Debounce the query input: wait 3s after the last keystroke to apply search
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(query), 1000);
    return () => clearTimeout(id);
  }, [query]);

  // Sync items — bb-transaction-list will group them by month
  useEffect(() => {
    const el = listRef.current as any;
    if (el) el.items = paginatedTransactions;
  }, [paginatedTransactions]);

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

          <div className="mb-4 flex items-center justify-between gap-4">
            <input
              aria-label="Pesquisar transações"
              placeholder="Pesquisar por descrição"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            />

            <div className="text-sm text-slate-600">
              Exibindo {filtered.length === 0 ? 0 : Math.min(startIndex + 1, filtered.length)}-
              {Math.min(startIndex + itemsPerPage, filtered.length)} de {filtered.length} transações
            </div>
          </div>

        {/* group-by-month handled entirely inside bb-transaction-list */}
        <bb-transaction-list ref={listRef} group-by-month={true} />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-600">
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 text-slate-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
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
