"use client";

import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTransactions } from "@/contexts/Transactions";
import { brl } from "@/lib/format";
import { computeBalanceOverTime } from "../helpers";
import { EmptyChartState } from "../EmptyState";

const LINE_COLOR = "var(--bb-primary, #374C34)";

export function SaldoEvolucaoChart() {
  const { transactions, balance } = useTransactions();
  const data = useMemo(
    () => computeBalanceOverTime(transactions, balance),
    [transactions, balance]
  );

  if (data.length === 0) {
    return <EmptyChartState message="Sem dados para exibir" />;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(value) => brl.format(Number(value))} width={90} tick={{ fontSize: 11 }} />
        <Tooltip formatter={(value) => brl.format(Number(value))} />
        <Line type="monotone" dataKey="balance" name="Saldo" stroke={LINE_COLOR} strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
