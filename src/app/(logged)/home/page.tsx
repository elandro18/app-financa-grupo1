import { getCurrentUser } from "@/lib/auth";
import { getTodayFormatted } from "@/lib/format";
import { BalanceCard } from "./_components/BalanceCard";
import { RecentTransactionsCard } from "./_components/RecentTransactionsCard";
import { ServicesCard } from "./_components/ServicesCard";

export default function HomePage() {
  const { user, account } = getCurrentUser();
  const today = getTodayFormatted();

  return (
    <div className="grid grid-cols-[1fr_300px] gap-6 h-full">
      <main className="flex flex-col gap-6">
        <BalanceCard
          greetingName={user.firstName}
          today={today}
          accountType={account.type}
        />
        <ServicesCard />
      </main>

      <RecentTransactionsCard />
    </div>
  );
}
