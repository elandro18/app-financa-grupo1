export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  terms: boolean;
};

export type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: RegisterFormData) => void;
};