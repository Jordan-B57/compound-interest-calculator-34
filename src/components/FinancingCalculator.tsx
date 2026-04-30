import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const parseBRLInput = (raw: string): number => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return 0;
  return parseInt(digits, 10) / 100;
};

const formatBRLInput = (value: number): string =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

interface MonthRow {
  month: number;
  installment: number;
  interest: number;
  amortization: number;
  balance: number;
}

interface SystemResult {
  schedule: MonthRow[];
  totalPaid: number;
  totalInterest: number;
  firstInstallment: number;
  lastInstallment: number;
  averageInstallment: number;
}

interface SimulationResult {
  financedAmount: number;
  months: number;
  sac: SystemResult;
  price: SystemResult;
  chartInstallments: { month: number; SAC: number; Price: number }[];
  chartBalance: { month: number; SAC: number; Price: number }[];
}

const simulateSAC = (
  principal: number,
  monthlyRate: number,
  months: number,
): SystemResult => {
  const schedule: MonthRow[] = [];
  const amortization = principal / months;
  let balance = principal;
  let totalPaid = 0;
  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    const installment = amortization + interest;
    balance -= amortization;
    if (m === months) balance = 0;
    totalPaid += installment;
    totalInterest += interest;
    schedule.push({
      month: m,
      installment,
      interest,
      amortization,
      balance: Math.max(balance, 0),
    });
  }

  return {
    schedule,
    totalPaid,
    totalInterest,
    firstInstallment: schedule[0]?.installment ?? 0,
    lastInstallment: schedule[schedule.length - 1]?.installment ?? 0,
    averageInstallment: totalPaid / months,
  };
};

const simulatePrice = (
  principal: number,
  monthlyRate: number,
  months: number,
): SystemResult => {
  const schedule: MonthRow[] = [];
  const installment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  let balance = principal;
  let totalPaid = 0;
  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    const amortization = installment - interest;
    balance -= amortization;
    if (m === months) balance = 0;
    totalPaid += installment;
    totalInterest += interest;
    schedule.push({
      month: m,
      installment,
      interest,
      amortization,
      balance: Math.max(balance, 0),
    });
  }

  return {
    schedule,
    totalPaid,
    totalInterest,
    firstInstallment: installment,
    lastInstallment: installment,
    averageInstallment: installment,
  };
};

const FinancingCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [term, setTerm] = useState(30);
  const [termUnit, setTermUnit] = useState<"anos" | "meses">("anos");
  const [rate, setRate] = useState(11);
  const [rateUnit, setRateUnit] = useState<"anual" | "mensal">("anual");

  const [propertyValueStr, setPropertyValueStr] = useState(
    formatBRLInput(300000),
  );
  const [downPaymentStr, setDownPaymentStr] = useState(formatBRLInput(60000));

  const [result, setResult] = useState<SimulationResult | null>(null);

  const financedAmount = useMemo(
    () => Math.max(propertyValue - downPayment, 0),
    [propertyValue, downPayment],
  );

  const handleCalculate = () => {
    const months = Math.max(
      1,
      Math.round(termUnit === "anos" ? term * 12 : term),
    );
    const monthlyRate =
      rateUnit === "anual"
        ? Math.pow(1 + rate / 100, 1 / 12) - 1
        : rate / 100;

    const sac = simulateSAC(financedAmount, monthlyRate, months);
    const price = simulatePrice(financedAmount, monthlyRate, months);

    const step = Math.max(1, Math.floor(months / 60));
    const chartInstallments: SimulationResult["chartInstallments"] = [];
    const chartBalance: SimulationResult["chartBalance"] = [];
    for (let i = 0; i < months; i += step) {
      chartInstallments.push({
        month: i + 1,
        SAC: Math.round(sac.schedule[i].installment),
        Price: Math.round(price.schedule[i].installment),
      });
      chartBalance.push({
        month: i + 1,
        SAC: Math.round(sac.schedule[i].balance),
        Price: Math.round(price.schedule[i].balance),
      });
    }
    // Ensure last point
    const last = months - 1;
    chartInstallments.push({
      month: months,
      SAC: Math.round(sac.schedule[last].installment),
      Price: Math.round(price.schedule[last].installment),
    });
    chartBalance.push({
      month: months,
      SAC: Math.round(sac.schedule[last].balance),
      Price: Math.round(price.schedule[last].balance),
    });

    setResult({
      financedAmount,
      months,
      sac,
      price,
      chartInstallments,
      chartBalance,
    });
  };

  const cheaperSystem = result
    ? result.sac.totalInterest < result.price.totalInterest
      ? "SAC"
      : "Price"
    : null;
  const interestDiff = result
    ? Math.abs(result.sac.totalInterest - result.price.totalInterest)
    : 0;

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-bold text-foreground">
          Dados do financiamento
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Valor do imóvel
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                R$
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={propertyValueStr}
                onChange={(e) => {
                  const v = parseBRLInput(e.target.value);
                  setPropertyValue(v);
                  setPropertyValueStr(formatBRLInput(v));
                }}
                className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Entrada
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                R$
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={downPaymentStr}
                onChange={(e) => {
                  const v = parseBRLInput(e.target.value);
                  setDownPayment(v);
                  setDownPaymentStr(formatBRLInput(v));
                }}
                className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Prazo (anos)
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={years}
              onChange={(e) => setYears(Number(e.target.value) || 0)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Taxa de juros anual (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="mt-5 rounded-md bg-muted/40 p-3 text-sm text-muted-foreground">
          Valor financiado:{" "}
          <span className="font-semibold text-foreground">
            {formatBRL(financedAmount)}
          </span>
        </div>

        <Button
          onClick={handleCalculate}
          className="mt-6 w-full md:w-auto"
          disabled={financedAmount <= 0 || years <= 0 || annualRate < 0}
        >
          Calcular
        </Button>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Veredito */}
          <div className="rounded-xl border-2 border-primary bg-[hsl(var(--brand-light))] p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Sistema com menor custo total de juros
            </p>
            <p className="mt-1 text-2xl font-bold text-primary md:text-3xl">
              {cheaperSystem}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Você paga{" "}
              <span className="font-semibold text-foreground">
                {formatBRL(interestDiff)}
              </span>{" "}
              a menos em juros escolhendo o {cheaperSystem}.
            </p>
          </div>

          {/* Cards comparativos */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-foreground">SAC</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Primeira parcela</dt>
                  <dd className="font-semibold text-foreground">
                    {formatBRL(result.sac.firstInstallment)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Última parcela</dt>
                  <dd className="font-semibold text-foreground">
                    {formatBRL(result.sac.lastInstallment)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total de juros</dt>
                  <dd className="font-semibold text-foreground">
                    {formatBRL(result.sac.totalInterest)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <dt className="text-muted-foreground">Total pago</dt>
                  <dd className="font-bold text-primary">
                    {formatBRL(result.sac.totalPaid)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-foreground">Price</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Parcela fixa</dt>
                  <dd className="font-semibold text-foreground">
                    {formatBRL(result.price.firstInstallment)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Última parcela</dt>
                  <dd className="font-semibold text-foreground">
                    {formatBRL(result.price.lastInstallment)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total de juros</dt>
                  <dd className="font-semibold text-foreground">
                    {formatBRL(result.price.totalInterest)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <dt className="text-muted-foreground">Total pago</dt>
                  <dd className="font-bold text-primary">
                    {formatBRL(result.price.totalPaid)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Gráfico de parcelas */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-1 text-lg font-bold text-foreground">
              Evolução das parcelas
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              No SAC as parcelas começam mais altas e diminuem. No Price elas
              ficam fixas.
            </p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.chartInstallments}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    label={{
                      value: "Mês",
                      position: "insideBottom",
                      offset: -5,
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) =>
                      `R$ ${(v / 1000).toFixed(0)}k`
                    }
                  />
                  <Tooltip
                    formatter={(v: number) => formatBRL(v)}
                    labelFormatter={(l) => `Mês ${l}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="SAC"
                    stroke="hsl(var(--chart-financing))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Price"
                    stroke="hsl(var(--chart-renting))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de saldo devedor */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-1 text-lg font-bold text-foreground">
              Evolução do saldo devedor
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              O SAC amortiza mais rápido a dívida nos primeiros anos.
            </p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.chartBalance}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    label={{
                      value: "Mês",
                      position: "insideBottom",
                      offset: -5,
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) =>
                      `R$ ${(v / 1000).toFixed(0)}k`
                    }
                  />
                  <Tooltip
                    formatter={(v: number) => formatBRL(v)}
                    labelFormatter={(l) => `Mês ${l}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="SAC"
                    stroke="hsl(var(--chart-financing))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Price"
                    stroke="hsl(var(--chart-renting))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FinancingCalculator;
