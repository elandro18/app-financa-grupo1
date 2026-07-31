"use client";

import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useTransactions } from "@/contexts/Transactions";
import { brl } from "@/lib/format";
import { groupExpensesByType } from "../helpers";
import { EmptyChartState } from "../EmptyState";

const SLICE_COLORS = [
  "var(--bb-primary, #374C34)",
  "var(--bb-warning, #f59e0b)",
  "#7A9471",
  "#B45309",
  "#94A3B8",
];

export function GastosPorTipoChart() {
  const { transactions } = useTransactions();
  const data = useMemo(() => groupExpensesByType(transactions), [transactions]);

  if (data.length === 0) {
    return <EmptyChartState message="Sem saídas registradas" />;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="type"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((slice, index) => (
            <Cell key={slice.type} fill={SLICE_COLORS[index % SLICE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => brl.format(Number(value))} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
