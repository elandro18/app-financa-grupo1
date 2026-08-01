// src/app/components/LoginModal/helpers/index.ts
import type { LoginFormData } from "../types";

export const validateLoginForm = (data: LoginFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.login.trim()) {
    errors.login = "Login é obrigatório";
  }

  if (!data.password) {
    errors.password = "Senha é obrigatória";
  } else if (data.password.length < 3) {
    errors.password = "Senha inválida";
  }

  return errors;
};