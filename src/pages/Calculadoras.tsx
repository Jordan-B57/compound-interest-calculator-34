import { Link } from "react-router-dom";
import { TrendingUp, Trophy, Home, ArrowRight } from "lucide-react";
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
];

const Calculadoras = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
          Calculadoras
        </h1>
        <p className="mb-8 text-muted-foreground">
          Ferramentas gratuitas para te ajudar a planejar suas finanças. Escolha
          uma calculadora abaixo.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {calculadoras.map((c) => {
            const Icon = c.icon;
            const card = (
              <div className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--brand-light))] text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mb-2 text-lg font-bold text-foreground">
                  {c.title}
                </h2>
                <p className="mb-6 flex-1 text-sm text-muted-foreground">
                  {c.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Acessar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
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
