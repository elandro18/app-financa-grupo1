"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { brl } from "@/lib/format";
import { useTransactions } from "@/contexts/Transactions";
import { BTN_DANGER_CLS, BTN_PRIMARY_CLS, Field, INPUT_CLS, INPUT_DISABLED_CLS } from "../Field";
import { Modal, ModalHeader } from "../Modal";
import type { Props } from "./types";
import type { Transaction } from "./types";

export type { Transaction } from "./types";

export function TransactionDetailModal({ transaction, onClose }: Props) {
  if (!transaction) return null;
  return <Editor transaction={transaction} onClose={onClose} />;
}

type EditorProps = {
  transaction: Transaction;
  onClose: () => void;
};

function Editor({ transaction, onClose }: EditorProps) {
  const { updateTransaction, deleteTransaction } = useTransactions();
  const [type, setType] = useState(transaction.type);
  const [description, setDescription] = useState(transaction.description ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTransaction(transaction.id, { type, description });
    onClose();
  };

  const handleDelete = () => {
    deleteTransaction(transaction.id);
    onClose();
  };

  return (
    <Modal open onClose={onClose} ariaLabel="Detalhar transação">
      <ModalHeader
        icon={<CreditCard size={64} />}
        title="Edite os campos abaixo para realizar sua operação!"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Nome da transação">
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={INPUT_CLS}
          />
        </Field>

        <Field label="Descrição (opcional)">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição da transação"
            className={INPUT_CLS}
          />
        </Field>

        <Field label="Valor">
          <input
            type="text"
            defaultValue={brl.format(Math.abs(transaction.amount))}
            disabled
            className={INPUT_DISABLED_CLS}
          />
        </Field>

        <Field label="Data Operação">
          <input
            type="text"
            defaultValue={transaction.date}
            disabled
            className={INPUT_DISABLED_CLS}
          />
        </Field>

        <button type="submit" className={`mt-4 ${BTN_PRIMARY_CLS}`}>
          Salvar alterações
        </button>
        <button type="button" onClick={handleDelete} className={BTN_DANGER_CLS}>
          Excluir transação
        </button>
      </form>
    </Modal>
  );
}
