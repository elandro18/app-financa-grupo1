"use client";

import Image from "next/image";
import { RegisterModal } from "./components/RegisterModal";
import { SuccessModal } from "./components/SuccessModal";
import { useState } from "react";
import { LoginModal } from "./components/LoginModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push("/home");
  };

  return (
    <div className="pai">
      <nav className="w-full flex items-center justify-center gap-16 p-4 bg-black text-white">
        {/* Logo/Branding */}
        <div className="text-xl font-bold">🟩 ByteFinanceBank</div>
  
        {/* Links do Menu */}
        <div className="flex gap-8">
          <a href="#" className="hover:text-gray-300 cursor-pointer">Sobre</a>
          <a href="#" className="hover:text-gray-300 cursor-pointer">Serviços</a>
        </div>
        
        {/* Botões */}
        <div className="flex gap-3">
          <button 
            onClick={() => setShowRegisterModal(true)}
            className="px-4 py-2 bg-green-500 text-black rounded font-bold hover:bg-green-600 cursor-pointer"
          >
            Abrir minha conta
          </button>
         
            <button
               onClick={() => { 
                setShowLoginModal(true);
                setLoginError("");
               }}
              className="px-4 py-2 border border-white text-white rounded font-bold hover:bg-white hover:text-black cursor-pointer">
              Já tenho conta
            </button>
         
        </div>
      </nav>   
      <main className="flex flex-col lg:flex-row items-center justify-center gap-4 pt-24">
        <div className=" max-w-2xl">
          <h3 className="text-center text-4xl font-semibold leading-normal my-8">
            Experimente mais liberdade no controle da sua vida financeira. 
          </h3>
          <h4 className="text-center text-4xl font-semibold leading-normal my-8 hidden lg:block">
            Crie sua conta com a gente!
          </h4>
        </div>
        <div className="flex justify-center">
          <Image 
            src="/bytebank1.png" 
            alt="Banco Digital" 
            width={500}
            height={500}
            className="w-full max-w-xl h-auto object-contain"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>
      </main>
      {/* Modal de Registro */}
      <RegisterModal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSubmit={async (data) => {
          try {
            const response = await fetch("/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            
            const result = await response.json();
            console.log("Resposta do servidor:", result);
            if (result.success) {
              setShowRegisterModal(false);
              setSuccessMessage("Cadastro realizado com sucesso! Você será redirecionado para a área logada.");
              setShowSuccessModal(true);
            } else {
              alert(result.message);
            }
          } catch (error) {
            console.error("Erro ao cadastrar:", error);
          }
        }}
      />
      {/* Modal de Login */}
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        errorMessage={loginError}
        onReset={() => setLoginError("")}
        onCadastroClick={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
          setLoginError("");
        }}
        onSubmit={async (data) => {
         try {
            const response = await fetch("/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            
            const result = await response.json();
            
            if (result.success) {
              setShowLoginModal(false);
              setSuccessMessage("Login realizado com sucesso! Você será redirecionado para a área logada.");
              setShowSuccessModal(true);
            } else {
              setLoginError(result.message);
            }
          } catch (error) {
            console.error("Erro ao fazer login:", error);
            setLoginError("Erro ao fazer login");
          }
        }}
      />
      {/* Modal de Sucesso */}
      <SuccessModal
        open={showSuccessModal}
        message={successMessage}
        onClose={handleSuccessClose}
        redirectIn={2}
      />
    </div>
    
  );
}
