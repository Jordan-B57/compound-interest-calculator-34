import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const JurosCompostos = () => {
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
          Calculadora de Juros Compostos
        </h1>
        <p className="mb-8 text-muted-foreground">
          Simule os rendimentos dos seus investimentos com aportes mensais e veja
          o poder dos juros sobre juros ao longo do tempo.
        </p>

        <CompoundInterestCalculator />

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Passo a passo para usar a calculadora
          </h2>
          {[
            {
              n: "Passo 1",
              text: "Preencha o campo 'valor inicial' com a quantia que você irá investir inicialmente.",
            },
            {
              n: "Passo 2",
              text: "Em 'valor mensal', informe quanto você pretende aportar todos os meses.",
            },
            {
              n: "Passo 3",
              text: "Defina a 'taxa de juros' e selecione se ela é mensal ou anual.",
            },
            {
              n: "Passo 4",
              text: "Escolha o 'período' do investimento em meses ou anos e clique em Calcular.",
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

export default JurosCompostos;
