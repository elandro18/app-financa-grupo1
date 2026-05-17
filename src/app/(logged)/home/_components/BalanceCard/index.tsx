"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { brl } from "@/lib/format";
import { useTransactions } from "@/contexts/Transactions";
import type { Props } from "./types";

export function BalanceCard({ greetingName, today, accountType }: Props) {
  const { balance } = useTransactions();
  const [visible, setVisible] = useState(true);

  return (
    <section className="bg-[#005c6e] text-white rounded-md p-8 min-h-[320px]">
      <div className="flex justify-between items-start gap-24">
        <div className="flex-1 min-w-[40%]">
          <h1 className="text-2xl font-bold">Olá, {greetingName}! :)</h1>
          <p className="mt-2 text-sm opacity-90">{today}</p>
        </div>

        <div className="w-full max-w-xs">
          <div className="flex items-center gap-2 border-b border-white/40 pb-1">
            <span className="font-semibold">Saldo</span>
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Ocultar saldo" : "Mostrar saldo"}
              className="ml-1 text-orange-400 hover:text-orange-300 cursor-pointer"
            >
              {visible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <p className="mt-3 text-sm opacity-90">{accountType}</p>
          <p className="text-2xl font-light tracking-wide">
            {visible ? brl.format(balance) : "R$ •••••"}
          </p>
        </div>
      </div>
    </section>
  );
}
