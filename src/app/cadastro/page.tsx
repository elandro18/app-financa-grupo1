// src/app/cadastro/page.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { RegisterModal } from "../components/RegisterModal";


export default function Cadastro() {
  const [showRegisterModal, setShowRegisterModal] = useState(true);
  const submittedRef = useRef(false);
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {showRegisterModal ? (
        <RegisterModal
          open={showRegisterModal}
          onClose={() => {
            // X/Escape/overlay fecha e volta para a página inicial;
            // após submit, mantém a mensagem de sucesso.
            if (submittedRef.current) {
              submittedRef.current = false;
              setShowRegisterModal(false);
            } else {
              router.push("/");
            }
          }}
          onSuccess={() => {
            submittedRef.current = true;
          }}
        />
      ) : (
        <div className="w-full max-w-md bg-white rounded-[var(--bb-radius-lg)] shadow-[var(--bb-shadow-md)] p-8 text-center">
          <div
            aria-hidden
            className="h-20 flex items-center justify-center"
          >
            <CircleCheck size={48} className="text-[var(--bb-success)]" />
          </div>
          <p className="text-[var(--bb-dark)] font-semibold text-lg mb-1">
            Cadastro realizado com sucesso!
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Bem-vindo ao ByteFinanceBank. Agora é só acessar sua conta.
          </p>
          <Link
            href="/login"
            className="inline-block px-4 py-2 bg-[var(--bb-warning)] text-[var(--bb-dark)] rounded font-bold hover:opacity-90 cursor-pointer"
          >
            Voltar para login
          </Link>
        </div>
      )}
    </div>
  );
}