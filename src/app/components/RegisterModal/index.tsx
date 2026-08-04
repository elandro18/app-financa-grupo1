
"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { validateForm } from "./helpers";
import type { Props, RegisterFormData } from "./types";
import { Modal, ModalHeader } from "@/app/(logged)/_components/Modal";
import { BTN_PRIMARY_CLS, Field, INPUT_CLS } from "@/app/(logged)/_components/Field";
import http from "../../../http";

export function RegisterModal({ open, onClose, onSubmit, onSuccess }: Props) {

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    birthDate: "",
    terms: false,
    agency: "",
    bankAccount: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro do campo ao usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Limpar erros se passou na validação
    setErrors({});
    setSubmitError("");

    try {
      // Chamar callback se fornecido
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Comportamento padrão: cadastrar na API externa
        setSubmitting(true);
        const userRegister = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          agency: formData.agency,
          bankAccount: formData.bankAccount,
        }

        const response = await http.post("/users", userRegister);

        if (response.status === 201) { 
          console.log("Usuário cadastrado com sucesso:", response);         
          onSuccess?.();
        } else {
          throw new Error("Falha ao cadastrar usuário");
        }
    
      }
      // Resetar formulário e fechar modal
      setFormData({
        name: "",
        email: "",
        password: "",
        birthDate: "",
        terms: false,
        agency: "",
        bankAccount: "",
      });
      onClose();
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);

      const apiMessage = error.response?.data?.message;

      let message = "Não foi possível criar a conta. Tente novamente.";

      if (Array.isArray(apiMessage)) {
        if (apiMessage.includes("Duplicated user")) {
          message = "Já existe um usuário cadastrado com este e-mail.";
        } else {
          message = apiMessage.join(", ");
        }
      }

      setSubmitError(message);
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    // Resetar estado ao fechar
    setFormData({
      name: "",
      email: "",
      password: "",
      birthDate: "",
      terms: false,
      agency: "",
      bankAccount: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} ariaLabel="Cadastro de usuário">
      <ModalHeader
        icon={<UserPlus size={64} />}
        title="Preencha os campos abaixo para criar sua conta!"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Nome */}
        <Field label="Nome completo">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
            className={INPUT_CLS}
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
        </Field>

        {/* Email */}
        <Field label="Email">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            className={INPUT_CLS}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </Field>

        {/* Senha */}
        <Field label="Senha">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              className={INPUT_CLS}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 text-sm"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
        </Field>

        {/* Agência */}
        <Field label="Agência">
          <input
            type="text"
            name="agency"
            value={formData.agency}
            onChange={handleChange}
            placeholder="Número da agência"
            className={INPUT_CLS}
          />
          {errors.agency && <span className="text-red-500 text-xs">{errors.agency}</span>}
        </Field>

        {/* Conta Bancaria */}
        <Field label="Conta bancária">
          <input
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            placeholder="Número da conta"
            className={INPUT_CLS}
          />
          {errors.bankAccount && <span className="text-red-500 text-xs">{errors.bankAccount}</span>}
        </Field>

        {/* Data de Nascimento */}
        <Field label="Data de nascimento">
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={INPUT_CLS}
          />
          {errors.birthDate && <span className="text-red-500 text-xs">{errors.birthDate}</span>}
        </Field>

        {/* Termo de uso */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            Li e estou ciente quanto às condições de tratamento dos 
            meus dados conforme descrito na Política de Privacidade do banco.
          </label>
        </div>

        {/* Erro de cadastro */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
            <p className="text-red-700 text-sm">{submitError}</p>
          </div>
        )}

        {/* Botão Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`${BTN_PRIMARY_CLS} w-full mt-4 ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {submitting ? "Criando conta..." : "Criar conta"}
        </button>
      </form>
    </Modal>
  );
}