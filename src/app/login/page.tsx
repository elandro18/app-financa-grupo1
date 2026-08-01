
"use client";

import { useState } from "react";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";

export default function Login() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* LoginModal */}
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSubmit={(data) => {
          console.log("Login:", data);
          // Aqui você valida contra suas credenciais
        }}
      />

      {/* RegisterModal */}
      <RegisterModal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSubmit={(data) => {
          console.log("Novo cadastro:", data);
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      {/* Overlay com link para registro (quando nenhum modal está aberto) */}
      {!showLoginModal && !showRegisterModal && (
        <div className="text-center">
          <p className="mb-4">Não tem conta?</p>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="text-emerald-500 hover:text-emerald-600 font-semibold"
          >
            Criar uma agora
          </button>
        </div>
      )}
    </div>
  );
}