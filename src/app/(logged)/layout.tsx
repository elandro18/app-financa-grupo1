import type { ReactNode } from "react";
import { User } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { TransactionsProvider } from "@/contexts/Transactions";
import { DsLoader } from "@/components/DsLoader";
import { Sidebar } from "./_components/Sidebar";
import { LogoutButton } from "./_components/LogoutButton";

export default function LoggedLayout({ children }: { children: ReactNode }) {
  const { user, account, transactions } = getCurrentUser();

  return (
    <div className="min-h-screen w-full bg-[#e7efe5] flex flex-col">
      <header className="bg-[#374C34] text-white">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-end gap-4">
          <span className="text-sm font-medium">{user.fullName}</span>
          <span
            aria-hidden
            className="w-10 h-10 rounded-full border-2 border-[#f59e0b] flex items-center justify-center text-[#f59e0b]"
          >
            <User size={20} />
          </span>
          <LogoutButton />
        </div>
      </header>

      <div className="flex-1 w-full max-w-7xl mx-auto px-8 py-8 grid grid-cols-[220px_minmax(0,1fr)] gap-6">
        {/* Loads the DS Web Component library on the client side only */}
        <DsLoader />
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
