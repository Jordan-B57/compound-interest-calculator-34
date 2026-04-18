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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
type PeriodUnit = "meses" | "anos";

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
  contribution: number;
  interest: number;
  totalContributed: number;
  totalInterest: number;
  balance: number;
}

const CompoundInterestCalculator = () => {
  const [initial, setInitial] = useState<number>(0);
  const [monthly, setMonthly] = useState<number>(0);
  const [rate, setRate] = useState<string>("8");
  const [rateUnit, setRateUnit] = useState<RateUnit>("anual");
  const [period, setPeriod] = useState<string>("1");
  const [periodUnit, setPeriodUnit] = useState<PeriodUnit>("anos");
  const [result, setResult] = useState<{
    rows: MonthRow[];
    totalContributed: number;
    totalInterest: number;
    finalBalance: number;
  } | null>(null);

  const handleCalculate = () => {
    const r = parseFloat(rate.replace(",", ".")) || 0;
    const p = parseInt(period, 10) || 0;
    const months = periodUnit === "anos" ? p * 12 : p;
    // convert rate to monthly
    const monthlyRate =
      rateUnit === "anual"
        ? Math.pow(1 + r / 100, 1 / 12) - 1
        : r / 100;

    const rows: MonthRow[] = [];
    let balance = initial;
    let totalContributed = initial;
    let totalInterest = 0;

    for (let m = 1; m <= months; m++) {
      const interest = balance * monthlyRate;
      balance = balance + interest + monthly;
      totalContributed += monthly;
      totalInterest += interest;
      rows.push({
        month: m,
        contribution: monthly,
        interest,
        totalContributed,
        totalInterest,
        balance,
      });
    }

    setResult({
      rows,
      totalContributed,
      totalInterest,
      finalBalance: balance,
    });
  };

  const handleClear = () => {
    setInitial(0);
    setMonthly(0);
    setRate("8");
    setRateUnit("anual");
    setPeriod("1");
    setPeriodUnit("anos");
    setResult(null);
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    // Aggregate yearly for readability
    const data: { label: string; Investido: number; Juros: number }[] = [];
    const step = result.rows.length > 24 ? 12 : 1;
    for (let i = step - 1; i < result.rows.length; i += step) {
      const r = result.rows[i];
      data.push({
        label:
          step === 12
            ? `Ano ${(i + 1) / 12}`
            : `Mês ${r.month}`,
        Investido: Number(r.totalContributed.toFixed(2)),
        Juros: Number(r.totalInterest.toFixed(2)),
      });
    }
    return data;
  }, [result]);

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-xl font-bold text-primary md:text-2xl">
          Simulador de Juros Compostos
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Valor inicial */}
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

          {/* Valor mensal */}
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

          {/* Taxa de juros */}
          <div>
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

          {/* Período */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Período
            </label>
            <div className="flex">
              <input
                type="number"
                min={1}
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Select
                value={periodUnit}
                onValueChange={(v) => setPeriodUnit(v as PeriodUnit)}
              >
                <SelectTrigger className="h-10 w-[120px] rounded-l-none border-l-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meses">mês(es)</SelectItem>
                  <SelectItem value="anos">ano(s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Button
            onClick={handleCalculate}
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
          {/* Summary cards */}
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
            <div className="rounded-lg border border-border bg-[hsl(var(--brand-light))] p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Valor final</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatBRL(result.finalBalance)}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-primary">
              Evolução do patrimônio
            </h3>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                  <Bar dataKey="Investido" stackId="a" fill="hsl(var(--muted-foreground))" />
                  <Bar dataKey="Juros" stackId="a" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="max-h-[500px] overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-muted">
                  <TableRow>
                    <TableHead className="font-semibold">Mês</TableHead>
                    <TableHead className="font-semibold">Aporte</TableHead>
                    <TableHead className="font-semibold">Juros</TableHead>
                    <TableHead className="font-semibold">Total investido</TableHead>
                    <TableHead className="font-semibold">Total juros</TableHead>
                    <TableHead className="font-semibold">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.rows.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{formatBRL(row.contribution)}</TableCell>
                      <TableCell className="text-primary">
                        {formatBRL(row.interest)}
                      </TableCell>
                      <TableCell>{formatBRL(row.totalContributed)}</TableCell>
                      <TableCell>{formatBRL(row.totalInterest)}</TableCell>
                      <TableCell className="font-semibold">
                        {formatBRL(row.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;
