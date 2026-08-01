"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTransactions } from "@/contexts/Transactions";
import { getCurrentUser } from "@/lib/auth";

function toDisplayDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function NovaTransacaoForm() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const ref = useRef<HTMLElement>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  // Stable ref so the effect closure never goes stale
  const addTransactionRef = useRef(addTransaction);
  addTransactionRef.current = addTransaction;

  useEffect(() => {
    const el = ref.current as any;
    if (!el) return;

    const handleSubmit = (e: Event) => {
      const { type, amount, date, description, agency, account, pixKey } = (e as CustomEvent).detail as {
        type: string;
        amount: number;
        date: string; // YYYY-MM-DD from the WC date input
        description?: string;
        agency?: string;
        account?: string;
        pixKey?: string;
      };

      const attachmentMeta = attachments.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));

      // Saque and Depósito to own account don't carry ag/conta from the WC —
      // enrich here with the logged-in user's own account data.
      const needsOwnAccount = type === 'Saque' || (type === 'Depósito' && amount > 0);
      const ownAccount = needsOwnAccount ? getCurrentUser().account : null;

      addTransactionRef.current({
        type,
        amount,
        date: toDisplayDate(date),
        description,
        agency:  ownAccount ? ownAccount.agency  : agency,
        account: ownAccount ? ownAccount.number  : account,
        pixKey,
        attachments: attachmentMeta,
      });
      router.push("/home");
    };

    const handleCancel = () => router.push("/home");

    el.addEventListener("submit", handleSubmit);
    el.addEventListener("cancel", handleCancel);
    return () => {
      el.removeEventListener("submit", handleSubmit);
      el.removeEventListener("cancel", handleCancel);
    };
  }, [attachments]); // runs once on mount and when attachments change so closure stays current

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setAttachments(Array.from(files));
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <main className="bg-white/60 rounded-md p-8 md:p-10 w-full max-w-2xl">
      <h1 className="text-2xl font-bold text-center mb-8">Nova transação</h1>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2" htmlFor="transaction-attachments">
          Anexos
        </label>
        <input
          id="transaction-attachments"
          type="file"
          multiple
          onChange={handleFilesChange}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {attachments.length > 0 ? (
          <div className="mt-3 space-y-2">
            {attachments.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              >
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-slate-500">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-100"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <bb-new-transaction-list ref={ref} />
    </main>
  );
}
