export type LoginFormData = {
  login: string;
  password: string;
};

export type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: LoginFormData) => void;
  errorMessage?: string;
  onReset?: () => void;
  onCadastroClick?: () => void;
};