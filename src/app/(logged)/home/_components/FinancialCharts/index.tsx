import { EntradasSaidasChart } from "./EntradasSaidasChart";
import { GastosPorTipoChart } from "./GastosPorTipoChart";

export function FinancialCharts() {
  return (
    <section className="bg-white rounded-md p-8">
      <h2 className="text-lg font-bold mb-6">Análise financeira</h2>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-sm font-semibold mb-3">Entradas vs Saídas por mês</h3>
          <EntradasSaidasChart />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3">Distribuição de gastos por tipo</h3>
          <GastosPorTipoChart />
        </div>
      </div>
    </section>
  );
}
