import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import FirstMillionCalculator from "@/components/FirstMillionCalculator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const PrimeiroMilhao = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <Link
          to="/calculadoras"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar para calculadoras
        </Link>

        <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
          Calculadora do Primeiro Milhão
        </h1>
        <p className="mb-8 text-muted-foreground">
          Descubra em quanto tempo você atinge R$ 1.000.000,00 ou qual aporte
          mensal é necessário para chegar lá no prazo que você definir.
        </p>

        <FirstMillionCalculator />

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Como usar a calculadora
          </h2>
          {[
            {
              n: "Passo 1",
              text: "Escolha o tipo de cálculo: descobrir o prazo para atingir R$ 1 milhão ou o aporte mensal necessário.",
            },
            {
              n: "Passo 2",
              text: "Informe o valor inicial que você já tem investido (ou deixe em branco se está começando do zero).",
            },
            {
              n: "Passo 3",
              text: "Preencha o aporte mensal (no modo prazo) ou o período em anos (no modo aporte).",
            },
            {
              n: "Passo 4",
              text: "Defina a taxa de juros, escolha entre mensal ou anual e clique em Calcular.",
            },
          ].map((step) => (
            <div key={step.n}>
              <h3 className="font-bold text-foreground">{step.n}</h3>
              <p className="text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default PrimeiroMilhao;
