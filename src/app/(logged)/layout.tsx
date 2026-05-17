import type { ReactNode } from "react";
import { User } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { TransactionsProvider } from "@/contexts/Transactions";
import { Sidebar } from "./_components/Sidebar";

export default function LoggedLayout({ children }: { children: ReactNode }) {
  const { user, account, transactions } = getCurrentUser();

  return (
    <div className="min-h-screen w-full bg-[#e7efe5] flex flex-col">
      <header className="bg-[#005c6e] text-white">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-end gap-4">
          <span className="text-sm font-medium">{user.fullName}</span>
          <span
            aria-hidden
            className="w-10 h-10 rounded-full border-2 border-orange-400 flex items-center justify-center text-orange-400"
          >
            <User size={20} />
          </span>
        </div>
      </header>

      <div className="flex-1 w-full max-w-7xl mx-auto px-8 py-8 grid grid-cols-[180px_1fr] gap-6">
        <Sidebar />
        <TransactionsProvider
          initialBalance={account.balance}
          initialTransactions={transactions}
        >
          {children}
        </TransactionsProvider>
      </div>
    </div>
  );
}
