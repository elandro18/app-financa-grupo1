"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightLeft, ReceiptText } from "lucide-react";
import { NewTransactionModal } from "@/app/(logged)/_components/NewTransactionModal";

export function ServicesCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-white rounded-md p-8 min-h-[260px]">
        <h2 className="text-lg font-bold mb-6">
          Confira os serviços disponíveis
        </h2>
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-36 h-32 bg-gray-50 border border-gray-200 rounded-md flex flex-col items-center justify-center gap-3 hover:bg-gray-100 cursor-pointer"
          >
            <ArrowRightLeft aria-hidden size={32} className="text-emerald-600" />
            <span className="text-sm font-semibold">Nova transação</span>
          </button>
          <Link
            href="/extrato"
            className="w-36 h-32 bg-gray-50 border border-gray-200 rounded-md flex flex-col items-center justify-center gap-3 hover:bg-gray-100 cursor-pointer"
          >
            <ReceiptText aria-hidden size={32} className="text-emerald-600" />
            <span className="text-sm font-semibold">Extrato</span>
          </Link>
        </div>
      </section>

      <NewTransactionModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
