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

type Amortization = "SAC" | "PRICE";

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

type Scenario = "financiar" | "financiar_investir" | "alugar_investir";

interface SimulationResult {
  // Financiamento
  financedAmount: number;
  totalInstallments: number;
  totalInterestPaid: number;
  totalFinancingCost: number; // entrada + custos + parcelas
  firstInstallment: number;
  lastInstallment: number;
  schedule: MonthRow[];
  propertyFinalValue: number;

  // Aluguel + investimento
  totalRentPaid: number;
  rentingInvestmentFinal: number;
  rentingTotalInvested: number;

  // Financiar + investir a diferença (quando parcela < aluguel)
  financingInvestmentFinal: number;
  financingTotalInvested: number;

  // Patrimônio líquido final em cada cenário
  netOnlyFinancing: number;
  netFinancingInvesting: number;
  netRentingInvesting: number;

  winner: Scenario | "empate";
  difference: number;

  chart: {
    month: number;
    "Só financiando": number;
    "Financiando e investindo": number;
    "Alugando e investindo": number;
  }[];

  months: number;
}

const RentVsBuyCalculator = () => {
  // Imóvel
  const [propertyValue, setPropertyValue] = useState<number>(400_000);
  const [appreciation, setAppreciation] = useState<string>("4");

  // Financiamento
  const [downPayment, setDownPayment] = useState<number>(80_000);
  const [otherCosts, setOtherCosts] = useState<number>(15_000);
  const [years, setYears] = useState<string>("30");
  const [annualRate, setAnnualRate] = useState<string>("10");
  const [system, setSystem] = useState<Amortization>("PRICE");

  // Aluguel & Investimento
  const [monthlyRent, setMonthlyRent] = useState<number>(1_500);
  const [rentAdjustment, setRentAdjustment] = useState<string>("5");
  const [investmentRate, setInvestmentRate] = useState<string>("10");

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);

    const n = (parseInt(years, 10) || 0) * 12;
    if (n <= 0) {
      setError("Informe um prazo válido em anos.");
      return;
    }
    if (propertyValue <= 0) {
      setError("Informe o valor do imóvel.");
      return;
    }
    if (downPayment >= propertyValue) {
      setError("A entrada não pode ser maior ou igual ao valor do imóvel.");
      return;
    }

    const aRate = parseFloat(annualRate.replace(",", ".")) || 0;
    const iRate = parseFloat(investmentRate.replace(",", ".")) || 0;
    const appr = parseFloat(appreciation.replace(",", ".")) || 0;
    const rentAdj = parseFloat(rentAdjustment.replace(",", ".")) || 0;

    const monthlyFinRate = Math.pow(1 + aRate / 100, 1 / 12) - 1;
    const monthlyInvRate = Math.pow(1 + iRate / 100, 1 / 12) - 1;
    const monthlyApprRate = Math.pow(1 + appr / 100, 1 / 12) - 1;
    const monthlyRentAdj = Math.pow(1 + rentAdj / 100, 1 / 12) - 1;

    const principal = propertyValue - downPayment;

    // Tabela de amortização
    const schedule: MonthRow[] = [];
    let balance = principal;
    let totalInterestPaid = 0;
    let totalInstallments = 0;
    const installments: number[] = [];

    if (system === "SAC") {
      const amort = principal / n;
      for (let m = 1; m <= n; m++) {
        const interest = balance * monthlyFinRate;
        const installment = amort + interest;
        balance -= amort;
        totalInterestPaid += interest;
        totalInstallments += installment;
        installments.push(installment);
        schedule.push({
          month: m,
          installment,
          interest,
          amortization: amort,
          balance: Math.max(balance, 0),
        });
      }
    } else {
      // PRICE
      const pmt =
        monthlyFinRate === 0
          ? principal / n
          : (principal * monthlyFinRate) /
            (1 - Math.pow(1 + monthlyFinRate, -n));
      for (let m = 1; m <= n; m++) {
        const interest = balance * monthlyFinRate;
        const amort = pmt - interest;
        balance -= amort;
        totalInterestPaid += interest;
        totalInstallments += pmt;
        installments.push(pmt);
        schedule.push({
          month: m,
          installment: pmt,
          interest,
          amortization: amort,
          balance: Math.max(balance, 0),
        });
      }
    }

    // Cenário 1 — Só financiando: paga parcelas. Patrimônio = imóvel - saldo devedor.
    // Cenário 2 — Financiando e investindo: paga parcelas e, quando a parcela for menor
    //   que o aluguel de referência, investe a diferença (aluguel - parcela).
    //   Patrimônio = imóvel + investimentos.
    // Cenário 3 — Alugando e investindo: investe entrada+custos e, quando a parcela for
    //   maior que o aluguel, investe a diferença (parcela - aluguel). Patrimônio = investimentos.

    let rentingInvestBalance = downPayment + otherCosts;
    const rentingInvestStart = downPayment + otherCosts;
    let rentingExtraInvested = 0;
    let totalRentPaid = 0;
    let currentRent = monthlyRent;

    let financingInvestBalance = 0;
    let financingExtraInvested = 0;

    let propertyValueNow = propertyValue;

    const chart: SimulationResult["chart"] = [];
    const sampleStep = n > 240 ? 12 : n > 60 ? 6 : n > 24 ? 3 : 1;

    // ponto inicial (mês 0)
    chart.push({
      month: 0,
      "Só financiando": Number((propertyValue - principal).toFixed(2)),
      "Financiando e investindo": Number(
        (propertyValue - principal).toFixed(2),
      ),
      "Alugando e investindo": Number(rentingInvestBalance.toFixed(2)),
    });

    for (let m = 1; m <= n; m++) {
      const installment = installments[m - 1];

      // Aluguel + investimento
      const diffRent = installment - currentRent; // se positivo, aluga e investe
      rentingInvestBalance =
        rentingInvestBalance * (1 + monthlyInvRate) + diffRent;
      if (diffRent > 0) rentingExtraInvested += diffRent;

      // Financiamento + investimento
      const diffFin = currentRent - installment; // se positivo, parcela menor que aluguel: investe a diferença
      const aporteFin = diffFin > 0 ? diffFin : 0;
      financingInvestBalance =
        financingInvestBalance * (1 + monthlyInvRate) + aporteFin;
      financingExtraInvested += aporteFin;

      totalRentPaid += currentRent;
      currentRent = currentRent * (1 + monthlyRentAdj);
      propertyValueNow = propertyValueNow * (1 + monthlyApprRate);

      if (m % sampleStep === 0 || m === n) {
        const onlyFin = propertyValueNow - schedule[m - 1].balance;
        const finInvest = onlyFin + financingInvestBalance;
        chart.push({
          month: m,
          "Só financiando": Number(onlyFin.toFixed(2)),
          "Financiando e investindo": Number(finInvest.toFixed(2)),
          "Alugando e investindo": Number(rentingInvestBalance.toFixed(2)),
        });
      }
    }

    const propertyFinalValue = propertyValueNow;
    const totalFinancingCost = downPayment + otherCosts + totalInstallments;

    const netOnlyFinancing = propertyFinalValue;
    const netFinancingInvesting = propertyFinalValue + financingInvestBalance;
    const netRentingInvesting = rentingInvestBalance;

    const nets: { key: Scenario; value: number }[] = [
      { key: "financiar", value: netOnlyFinancing },
      { key: "financiar_investir", value: netFinancingInvesting },
      { key: "alugar_investir", value: netRentingInvesting },
    ];
    nets.sort((a, b) => b.value - a.value);
    const winner: SimulationResult["winner"] =
      Math.abs(nets[0].value - nets[1].value) < 1 ? "empate" : nets[0].key;
    const difference = nets[0].value - nets[1].value;

    setResult({
      financedAmount: principal,
      totalInstallments,
      totalInterestPaid,
      totalFinancingCost,
      firstInstallment: installments[0],
      lastInstallment: installments[installments.length - 1],
      schedule,
      propertyFinalValue,
      totalRentPaid,
      rentingInvestmentFinal: rentingInvestBalance,
      rentingTotalInvested: rentingInvestStart + rentingExtraInvested,
      financingInvestmentFinal: financingInvestBalance,
      financingTotalInvested: financingExtraInvested,
      netOnlyFinancing,
      netFinancingInvesting,
      netRentingInvesting,
      winner,
      difference,
      chart,
      months: n,
    });
  };

  const handleClear = () => {
    setPropertyValue(0);
    setDownPayment(0);
    setOtherCosts(0);
    setYears("30");
    setAnnualRate("10");
    setSystem("PRICE");
    setAppreciation("4");
    setMonthlyRent(0);
    setRentAdjustment("5");
    setInvestmentRate("10");
    setResult(null);
    setError(null);
  };

  const scenarioLabel = (s: Scenario): string => {
    if (s === "financiar") return "Só financiar";
    if (s === "financiar_investir") return "Financiar e investir";
    return "Alugar e investir";
  };

  const verdictText = useMemo(() => {
    if (!result) return "";
    if (result.winner === "empate") return "Os cenários são equivalentes.";
    return `${scenarioLabel(result.winner)} é a opção mais vantajosa, com ${formatBRL(
      result.difference,
    )} a mais que a segunda colocada.`;
  }, [result]);

  const renderMoneyInput = (
    label: string,
    value: number,
    setter: (n: number) => void,
  ) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex">
        <span className="flex items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
          R$
        </span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="00,00"
          value={value > 0 ? formatBRLInput(value) : ""}
          onChange={(e) => setter(parseBRLInput(e.target.value))}
          className="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
    </div>
  );

  const renderPercentInput = (
    label: string,
    value: string,
    setter: (s: string) => void,
  ) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="flex h-10 w-full rounded-l-md border border-r-0 border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <span className="flex items-center justify-center rounded-r-md border border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
          % a.a.
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-xl font-bold text-primary md:text-2xl">
          Simulador Alugar x Financiar
        </h2>

        {/* Imóvel */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Sobre o imóvel
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {renderMoneyInput("Valor do imóvel", propertyValue, setPropertyValue)}
            {renderPercentInput(
              "Valorização anual do imóvel",
              appreciation,
              setAppreciation,
            )}
          </div>
        </div>

        {/* Financiamento */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Financiamento
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {renderMoneyInput("Entrada", downPayment, setDownPayment)}
            {renderMoneyInput(
              "Outros custos (cartório, ITBI, etc.)",
              otherCosts,
              setOtherCosts,
            )}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Prazo (anos)
              </label>
              <div className="flex">
                <input
                  type="text"
                  inputMode="numeric"
                  value={years}
                  onChange={(e) => setYears(e.target.value.replace(/\D/g, ""))}
                  className="flex h-10 w-full rounded-l-md border border-r-0 border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <span className="flex items-center justify-center rounded-r-md border border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
                  anos
                </span>
              </div>
            </div>
            {renderPercentInput(
              "Taxa anual do financiamento",
              annualRate,
              setAnnualRate,
            )}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Sistema de amortização
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSystem("PRICE")}
                  className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                    system === "PRICE"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Price (parcelas fixas)
                </button>
                <button
                  onClick={() => setSystem("SAC")}
                  className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                    system === "SAC"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  SAC (parcelas decrescentes)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Aluguel */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Aluguel & Investimento
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {renderMoneyInput(
              "Aluguel mensal",
              monthlyRent,
              setMonthlyRent,
            )}
            {renderPercentInput(
              "Reajuste anual do aluguel",
              rentAdjustment,
              setRentAdjustment,
            )}
            {renderPercentInput(
              "Rentabilidade dos investimentos",
              investmentRate,
              setInvestmentRate,
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={handleCalculate} className="flex-1" size="lg">
            Calcular
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="flex-1 sm:flex-none"
            size="lg"
          >
            Limpar
          </Button>
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          {/* Veredito */}
          <div
            className={`rounded-lg border p-6 shadow-sm ${
              result.winner === "empate"
                ? "border-border bg-card"
                : "border-primary/50 bg-[hsl(var(--brand-light))]"
            }`}
          >
            <p className="mb-1 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Resultado da comparação
            </p>
            <p className="text-2xl font-bold text-foreground md:text-3xl">
              {verdictText}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Considerando o patrimônio líquido ao final de {parseInt(years, 10)}{" "}
              anos.
            </p>
          </div>

          {/* Cards Resumo */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-financing))]" />
                <h4 className="text-base font-bold text-foreground">
                  Só financiando
                </h4>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Valor financiado</dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.financedAmount)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">1ª parcela</dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.firstInstallment)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Última parcela</dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.lastInstallment)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total de juros</dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.totalInterestPaid)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Custo total</dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.totalFinancingCost)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <dt className="font-semibold text-foreground">
                    Patrimônio final
                  </dt>
                  <dd className="font-bold text-primary">
                    {formatBRL(result.netOnlyFinancing)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-financing-investing))]" />
                <h4 className="text-base font-bold text-foreground">
                  Financiando e investindo
                </h4>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Imóvel ao final</dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.propertyFinalValue)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Total investido (extra)
                  </dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.financingTotalInvested)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Investimentos ao final
                  </dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.financingInvestmentFinal)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <dt className="font-semibold text-foreground">
                    Patrimônio final
                  </dt>
                  <dd className="font-bold text-primary">
                    {formatBRL(result.netFinancingInvesting)}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                Quando a parcela é menor que o aluguel, a diferença é investida.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-renting))]" />
                <h4 className="text-base font-bold text-foreground">
                  Alugando e investindo
                </h4>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Investimento inicial
                  </dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(downPayment + otherCosts)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total em aluguéis</dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.totalRentPaid)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total investido</dt>
                  <dd className="font-medium text-foreground">
                    {formatBRL(result.rentingTotalInvested)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <dt className="font-semibold text-foreground">
                    Patrimônio final
                  </dt>
                  <dd className="font-bold text-primary">
                    {formatBRL(result.netRentingInvesting)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Gráfico */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h4 className="mb-4 text-lg font-bold text-foreground">
              Evolução do patrimônio
            </h4>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={result.chart}
                  margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    type="number"
                    domain={[0, result.months]}
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    label={{
                      value: "Meses",
                      position: "insideBottom",
                      offset: -10,
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(v) =>
                      `R$ ${(v / 1000).toLocaleString("pt-BR", {
                        maximumFractionDigits: 0,
                      })}k`
                    }
                  />
                  <Tooltip
                    formatter={(v: number) => formatBRL(v)}
                    labelFormatter={(l) => `Mês ${l}`}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Só financiando"
                    stroke="hsl(var(--chart-financing))"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Financiando e investindo"
                    stroke="hsl(var(--chart-financing-investing))"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="Alugando e investindo"
                    stroke="hsl(var(--chart-renting))"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Só financiando: valor de mercado do imóvel menos saldo devedor.
              Financiando e investindo: imóvel + investimentos da diferença
              parcela vs aluguel. Alugando e investindo: entrada e custos
              investidos + diferença mensal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentVsBuyCalculator;
