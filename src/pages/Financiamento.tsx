import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import FinancingCalculator from "@/components/FinancingCalculator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const Financiamento = () => {
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
          Simulador de Financiamento — SAC x Price
        </h1>
        <p className="mb-8 text-muted-foreground">
          Compare os dois principais sistemas de amortização e veja como muda o
          valor das parcelas, o saldo devedor e o total de juros pagos.
        </p>

        <FinancingCalculator />

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Como usar a calculadora
          </h2>
          {[
            {
              n: "Passo 1",
              text: "Informe o valor total do imóvel e o valor da entrada que você pretende dar.",
            },
            {
              n: "Passo 2",
              text: "Defina o prazo do financiamento em anos (no Brasil, costuma ir até 30 ou 35 anos).",
            },
            {
              n: "Passo 3",
              text: "Coloque a taxa de juros anual oferecida pelo banco e clique em Calcular.",
            },
            {
              n: "Passo 4",
              text: "Compare os cards de SAC e Price e analise os gráficos de parcelas e saldo devedor.",
            },
          ].map((step) => (
            <div key={step.n}>
              <h3 className="font-bold text-foreground">{step.n}</h3>
              <p className="text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            SAC x Price: qual a diferença?
          </h2>
          <p className="text-muted-foreground">
            No <strong>SAC (Sistema de Amortização Constante)</strong>, a parte
            que amortiza a dívida é fixa todos os meses. Como os juros caem com
            o tempo, as parcelas começam altas e vão diminuindo. O total de
            juros pagos costuma ser menor.
          </p>
          <p className="text-muted-foreground">
            No <strong>Price (Tabela Price)</strong>, a parcela é fixa do início
            ao fim. No começo a maior parte é juros e pouco amortiza, por isso o
            saldo devedor cai mais devagar e o total pago tende a ser maior.
          </p>
          <p className="text-muted-foreground">
            O SAC normalmente é mais barato no longo prazo, mas exige
            capacidade financeira maior nos primeiros anos. O Price ajuda no
            planejamento mensal por ter parcelas previsíveis.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Financiamento;
