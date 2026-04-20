import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

type RateUnit = "mensal" | "anual";
type CalcType = "prazo" | "aporte";

const TARGET = 1_000_000;

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

interface Result {
  type: CalcType;
  months: number;
  monthly: number;
  totalContributed: number;
  totalInterest: number;
  finalBalance: number;
  chart: { label: string; Investido: number; Juros: number }[];
}

const FirstMillionCalculator = () => {
  const [calcType, setCalcType] = useState<CalcType>("prazo");
  const [initial, setInitial] = useState<number>(0);
  const [monthly, setMonthly] = useState<number>(0);
  const [rate, setRate] = useState<string>("8");
  const [rateUnit, setRateUnit] = useState<RateUnit>("anual");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    const r = parseFloat(rate.replace(",", ".")) || 0;
    const monthlyRate =
      rateUnit === "anual" ? Math.pow(1 + r / 100, 1 / 12) - 1 : r / 100;

    if (initial >= TARGET) {
      setError("Seu valor inicial já é maior ou igual a R$ 1.000.000,00.");
      return;
    }

    let months = 0;
    let usedMonthly = monthly;

    if (calcType === "prazo") {
      if (monthly <= 0 && monthlyRate <= 0) {
        setError("Informe um aporte mensal ou taxa de juros maior que zero.");
        return;
      }
      let balance = initial;
      const MAX_MONTHS = 12 * 100;
      while (balance < TARGET && months < MAX_MONTHS) {
        balance = balance * (1 + monthlyRate) + monthly;
        months++;
      }
      if (months >= MAX_MONTHS) {
        setError(
          "Com esses valores, levaria mais de 100 anos. Aumente o aporte ou a taxa.",
        );
        return;
      }
    } else {
      return;
    }

    let balance = initial;
    let totalContributed = initial;
    let totalInterest = 0;
    const chart: Result["chart"] = [];
    const step = months > 24 ? 12 : 1;
    for (let m = 1; m <= months; m++) {
      const interest = balance * monthlyRate;
      balance = balance + interest + usedMonthly;
      totalContributed += usedMonthly;
      totalInterest += interest;
      if (m % step === 0 || m === months) {
        chart.push({
          label: step === 12 ? `Ano ${Math.ceil(m / 12)}` : `Mês ${m}`,
          Investido: Number(totalContributed.toFixed(2)),
          Juros: Number(totalInterest.toFixed(2)),
        });
      }
    }

    setResult({
      type: calcType,
      months,
      monthly: usedMonthly,
      totalContributed,
      totalInterest,
      finalBalance: balance,
      chart,
    });
  };

  const [years, setYears] = useState<string>("10");

  const handleCalculateAporte = () => {
    setError(null);
    const r = parseFloat(rate.replace(",", ".")) || 0;
    const monthlyRate =
      rateUnit === "anual" ? Math.pow(1 + r / 100, 1 / 12) - 1 : r / 100;
    const n = (parseInt(years, 10) || 0) * 12;

    if (n <= 0) {
      setError("Informe um período válido em anos.");
      return;
    }
    if (initial >= TARGET) {
      setError("Seu valor inicial já é maior ou igual a R$ 1.000.000,00.");
      return;
    }

    const fvInitial = initial * Math.pow(1 + monthlyRate, n);
    const remaining = TARGET - fvInitial;

    let pmt: number;
    if (remaining <= 0) {
      pmt = 0;
    } else if (monthlyRate === 0) {
      pmt = remaining / n;
    } else {
      pmt = remaining / ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
    }

    let balance = initial;
    let totalContributed = initial;
    let totalInterest = 0;
    const chart: Result["chart"] = [];
    const step = n > 24 ? 12 : 1;
    for (let m = 1; m <= n; m++) {
      const interest = balance * monthlyRate;
      balance = balance + interest + pmt;
      totalContributed += pmt;
      totalInterest += interest;
      if (m % step === 0 || m === n) {
        chart.push({
          label: step === 12 ? `Ano ${Math.ceil(m / 12)}` : `Mês ${m}`,
          Investido: Number(totalContributed.toFixed(2)),
          Juros: Number(totalInterest.toFixed(2)),
        });
      }
    }

    setResult({
      type: "aporte",
      months: n,
      monthly: pmt,
      totalContributed,
      totalInterest,
      finalBalance: balance,
      chart,
    });
  };

  const handleClear = () => {
    setInitial(0);
    setMonthly(0);
    setRate("8");
    setRateUnit("anual");
    setYears("10");
    setResult(null);
    setError(null);
  };

  const onCalculate = () =>
    calcType === "prazo" ? handleCalculate() : handleCalculateAporte();

  const periodLabel = useMemo(() => {
    if (!result) return "";
    const yrs = Math.floor(result.months / 12);
    const mts = result.months % 12;
    if (yrs === 0) return `${mts} mês(es)`;
    if (mts === 0) return `${yrs} ano(s)`;
    return `${yrs} ano(s) e ${mts} mês(es)`;
  }, [result]);

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-xl font-bold text-primary md:text-2xl">
          Simulador do Primeiro Milhão
        </h2>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Tipo de cálculo
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              onClick={() => {
                setCalcType("prazo");
                setResult(null);
              }}
              className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                calcType === "prazo"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background text-foreground hover:bg-muted"
              }`}
            >
              Calcular prazo para R$ 1 milhão
            </button>
            <button
              onClick={() => {
                setCalcType("aporte");
                setResult(null);
              }}
              className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                calcType === "aporte"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background text-foreground hover:bg-muted"
              }`}
            >
              Calcular aporte mensal necessário
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Valor inicial
            </label>
            <div className="flex">
              <span className="flex items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
                R$
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="00,00"
                value={initial > 0 ? formatBRLInput(initial) : ""}
                onChange={(e) => setInitial(parseBRLInput(e.target.value))}
                className="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {calcType === "prazo" ? (
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Valor mensal
              </label>
              <div className="flex">
                <span className="flex items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="00,00"
                  value={monthly > 0 ? formatBRLInput(monthly) : ""}
                  onChange={(e) => setMonthly(parseBRLInput(e.target.value))}
                  className="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Período (anos)
              </label>
              <input
                type="number"
                min={1}
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Taxa de juros
            </label>
            <div className="flex">
              <span className="flex items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
                %
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Select
                value={rateUnit}
                onValueChange={(v) => setRateUnit(v as RateUnit)}
              >
                <SelectTrigger className="h-10 w-[110px] rounded-l-none border-l-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">mensal</SelectItem>
                  <SelectItem value="anual">anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Button
            onClick={onCalculate}
            className="bg-primary px-8 text-primary-foreground hover:bg-[hsl(var(--brand-dark))]"
          >
            Calcular
          </Button>
          <button
            onClick={handleClear}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Limpar
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-[hsl(var(--brand-light))] p-6 shadow-sm">
            {result.type === "prazo" ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Tempo para atingir R$ 1.000.000,00
                </p>
                <p className="mt-1 text-2xl font-bold text-primary md:text-3xl">
                  {periodLabel}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Aporte mensal necessário
                </p>
                <p className="mt-1 text-2xl font-bold text-primary md:text-3xl">
                  {formatBRL(result.monthly)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  para atingir R$ 1.000.000,00 em {periodLabel}
                </p>
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Total investido</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatBRL(result.totalContributed)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Total em juros</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatBRL(result.totalInterest)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Valor final</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatBRL(result.finalBalance)}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-primary">
              Evolução do patrimônio
            </h3>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.chart}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="label"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(v) =>
                      v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
                    }
                  />
                  <Tooltip
                    formatter={(value: number) => formatBRL(value)}
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="Investido"
                    stackId="a"
                    fill="hsl(var(--muted-foreground))"
                  />
                  <Bar
                    dataKey="Juros"
                    stackId="a"
                    fill="hsl(var(--primary))"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstMillionCalculator;
