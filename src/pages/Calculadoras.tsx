import { Link } from "react-router-dom";
import { TrendingUp, Trophy, Home, Building2, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const calculadoras = [
  {
    slug: "juros-compostos",
    title: "Calculadora de Juros Compostos",
    description:
      "Simule o crescimento dos seus investimentos com aportes mensais e veja o poder dos juros sobre juros.",
    icon: TrendingUp,
    available: true,
  },
  {
    slug: "primeiro-milhao",
    title: "Calculadora do Primeiro Milhão",
    description:
      "Descubra em quanto tempo você atinge R$ 1 milhão ou qual aporte mensal é necessário para chegar lá.",
    icon: Trophy,
    available: true,
  },
  {
    slug: "alugar-x-financiar",
    title: "Calculadora Alugar x Financiar",
    description:
      "Compare financiar um imóvel com alugar e investir a diferença. Veja qual opção gera mais patrimônio.",
    icon: Home,
    available: true,
  },
  {
    slug: "financiamento",
    title: "Simulador de Financiamento",
    description:
      "Compare os sistemas SAC e Price lado a lado e veja parcelas, juros e saldo devedor com gráficos.",
    icon: Building2,
    available: true,
  },
];

const Calculadoras = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Ferramentas
        </p>
        <h1 className="mb-4 font-display text-4xl leading-tight text-foreground md:text-6xl">
          Calculadoras gratuitas
        </h1>
        <p className="mb-12 max-w-2xl text-foreground/70 md:text-lg">
          Ferramentas pensadas para te ajudar a planejar suas finanças com
          clareza. Escolha uma calculadora abaixo.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {calculadoras.map((c) => {
            const Icon = c.icon;
            const card = (
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card-gradient p-7 transition-all hover:-translate-y-1 hover:border-primary/60">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mb-3 text-lg font-semibold text-foreground">
                  {c.title}
                </h2>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-foreground/70">
                  {c.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Acessar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              </div>
            );

            return c.available ? (
              <Link key={c.slug} to={`/calculadoras/${c.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={c.slug} className="opacity-60">
                {card}
              </div>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Calculadoras;
