"use client";

import { CreditCard } from "lucide-react";
import { maskAmount } from "@/lib/format";
import { useTransactions } from "@/contexts/Transactions";
import { BTN_PRIMARY_CLS, Field, INPUT_CLS } from "../Field";
import { Modal, ModalHeader } from "../Modal";
import { TRANSACTION_TYPES } from "./constants";
import { parseAmount, toDisplayDate } from "./helpers";
import { useNewTransactionForm } from "./hooks/useNewTransactionForm";
import type { Props } from "./types";

export function NewTransactionModal({ open, onClose }: Props) {
  const { addTransaction } = useTransactions();
  const { type, setType, amount, setAmount, date, setDate } = useNewTransactionForm(open);

  const isPix = type === "Pix";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseAmount(amount);
    if (!type || parsed === null || !date) return;
    const sign = type === "Depósito" ? 1 : -1;
    addTransaction({
      type,
      amount: sign * Math.abs(parsed),
      date: toDisplayDate(date),
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Nova transação">
      <ModalHeader
        icon={<CreditCard size={64} />}
        title="Preencha os campos abaixo para realizar sua operação!"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Tipo de transação">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`${INPUT_CLS} bg-white`}
          >
            <option value="" disabled>
              Selecione o tipo de transação
            </option>
            {TRANSACTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Valor">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm pointer-events-none">
              R$
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(maskAmount(e.target.value))}
              placeholder="0,00"
              className={`${INPUT_CLS} pl-10 w-full`}
            />
          </div>
        </Field>

        {isPix ? (
          <Field label="Chave Pix">
            <input
              type="text"
              placeholder="Digite a chave Pix de destino"
              className={INPUT_CLS}
            />
          </Field>
        ) : (
          <>
            <Field label="Agência">
              <input
                type="text"
                placeholder="Digite a agência de destino"
                className={INPUT_CLS}
              />
            </Field>

            <Field label="Conta">
              <input
                type="text"
                placeholder="Digite a conta de destino"
                className={INPUT_CLS}
              />
            </Field>
          </>
        )}

        <Field label="Data">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={INPUT_CLS}
          />
        </Field>

        <button type="submit" className={`mt-4 ${BTN_PRIMARY_CLS}`}>
          Concluir transação
        </button>
      </form>
    </Modal>
  );
}
