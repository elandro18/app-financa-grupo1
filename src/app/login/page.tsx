
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";
import { setSession } from "@/lib/session";
import http  from "../../http";

export default function Login() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
        const response = await http.post("/auth/token", data);
        sessionStorage.setItem("token", response.data.accessToken);
        const profileResponse = await http.get("/auth/profile");
        console.log("Perfil do usuário:", profileResponse.data);
        const profile = profileResponse.data;
        console.log("Profile", profile);
        setSession(response.data.accessToken, {
          userId: profile.id ?? profile.userId ?? profile.sub,
          login: profile.email,
          fullName: profile.name,
          firstName: profile.name.split(" ")[0],
          
        });
        // console.log("Login bem-sucedido:", response.data);
        router.push("/home");

      } catch (error) {
        console.error("Erro ao fazer login:", error);
        setLoginError("Erro ao fazer login");
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* LoginModal */}
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSubmit={handleLogin}
        errorMessage={loginError}
        onReset={() => setLoginError("")}
        onCadastroClick={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
          setLoginError("");
        }}
      />

      {/* RegisterModal */}
      <RegisterModal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      {/* Overlay com card para registro (quando nenhum modal está aberto) */}
      {!showLoginModal && !showRegisterModal && (
        <div className="w-full max-w-md bg-white rounded-[var(--bb-radius-lg)] shadow-[var(--bb-shadow-md)] p-8 text-center">
          <div aria-hidden className="h-20 flex items-center justify-center">
            <UserPlus size={48} className="text-[var(--bb-accent)]" />
          </div>
          <p className="text-[var(--bb-dark)] font-semibold text-lg mb-1">
            Ainda não tem conta?
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Crie sua conta agora e tenha liberdade no controle das suas finanças em minutos. É grátis!
          </p>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-4 py-2 bg-[var(--bb-warning)] text-[var(--bb-dark)] rounded font-bold hover:opacity-90 cursor-pointer"
          >
            Criar conta agora
          </button>
        </div>
      )}
    </div>
  );
}
