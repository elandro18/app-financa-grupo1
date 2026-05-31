export type Transaction = {
  id: string;
  type: string;
  amount: number;
  date: string;
  description?: string;
  agency?: string;
  account?: string;
  pixKey?: string;
};

export type Props = {
  transaction: Transaction | null;
  onClose: () => void;
};
