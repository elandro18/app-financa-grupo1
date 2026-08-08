"use client";

import { useEffect } from "react";
import { TriangleAlert, X } from "lucide-react";

/**
 * Toast de erro fixo (canto inferior direito). Some sozinho após alguns
 * segundos ou ao clicar no X. Usado para falhas de criar/editar/excluir.
 */
export function ErrorToast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-[1100] flex max-w-sm items-start gap-2 rounded-md border border-red-200 bg-red-50 p-4 shadow-lg"
    >
      <TriangleAlert size={18} className="mt-0.5 shrink-0 text-red-600" />
      <p className="flex-1 text-sm text-red-700">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="text-red-600 hover:text-red-800"
      >
        <X size={16} />
      </button>
    </div>
  );
}
