import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import RentVsBuyCalculator from "@/components/RentVsBuyCalculator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const AlugarXFinanciar = () => {
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
          Calculadora Alugar x Financiar
        </h1>
        <p className="mb-8 text-muted-foreground">
          Compare financiar um imóvel com alugar e investir a diferença. Veja
          qual cenário gera mais patrimônio ao longo do tempo.
        </p>

        <RentVsBuyCalculator />

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Como usar a calculadora
          </h2>
          {[
            {
              n: "Passo 1",
              text: "Informe o valor do imóvel e a valorização anual esperada (em geral, próxima da inflação).",
            },
            {
              n: "Passo 2",
              text: "Preencha os dados do financiamento: entrada, outros custos (cartório, ITBI), prazo em anos e taxa de juros anual.",
            },
            {
              n: "Passo 3",
              text: "Escolha o sistema de amortização (Price para parcelas fixas ou SAC para parcelas decrescentes).",
            },
            {
              n: "Passo 4",
              text: "Informe o aluguel mensal equivalente, o reajuste anual e a rentabilidade que seus investimentos teriam, e clique em Calcular.",
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
            Como o cálculo funciona
          </h2>
          <p className="text-muted-foreground">
            No cenário <strong>Financiar</strong>, você dá a entrada, paga os
            custos iniciais e as parcelas mensais. Ao final do prazo, seu
            patrimônio é o valor de mercado do imóvel (já valorizado) sem saldo
            devedor.
          </p>
          <p className="text-muted-foreground">
            No cenário <strong>Alugar e investir</strong>, o valor da entrada e
            dos custos é investido logo no início. Todo mês, a diferença entre a
            parcela do financiamento e o aluguel também é aportada nos
            investimentos. O aluguel sofre reajuste anual.
          </p>
          <p className="text-muted-foreground">
            O resultado mostra qual cenário gera mais patrimônio líquido ao
            final do período. Lembre-se: a decisão financeira é apenas uma parte
            — questões como mobilidade, estabilidade e estilo de vida também
            importam.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default AlugarXFinanciar;
