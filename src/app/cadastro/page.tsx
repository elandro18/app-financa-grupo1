// src/app/cadastro/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { RegisterModal } from "../components/RegisterModal";


export default function Cadastro() {
  const [showRegisterModal, setShowRegisterModal] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {showRegisterModal ? (
        <RegisterModal
          open={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSubmit={(data) => {
            console.log("Novo cadastro:", data);
          }}
        />
      ) : (
        <div className="text-center">
          <p className="text-green-600 font-semibold mb-4">Cadastro realizado com sucesso!</p>
          <Link href="/login" className="text-emerald-500 hover:text-emerald-600">
            Voltar para login
          </Link>
        </div>
      )}
    </div>
  );
}