import { Search } from "lucide-react";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto flex flex-col items-stretch gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary-foreground text-primary">
              <span className="text-lg font-black">▶</span>
            </div>
            <span className="text-xl font-bold tracking-tight">iSardinha</span>
          </a>

          <div className="relative flex-1 md:mx-8 md:max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="pesquise notícias, recomendações e calculadoras"
              className="h-10 w-full rounded-full border-0 bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
            />
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium md:gap-6">
            <a href="#" className="hover:opacity-80">Notícias</a>
            <a href="#" className="hover:opacity-80">Empresas</a>
            <a href="#" className="hover:opacity-80">Calculadoras</a>
            <a
              href="#"
              className="rounded-md border border-primary-foreground px-4 py-1.5 hover:bg-primary-foreground hover:text-primary"
            >
              Agende uma consulta
            </a>
            <a href="#" className="hover:opacity-80">Entrar</a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
          Calculadora de Juros Compostos
        </h1>
        <p className="mb-8 text-muted-foreground">
          Simule os rendimentos dos seus investimentos com aportes mensais e veja
          o poder dos juros sobre juros ao longo do tempo.
        </p>

        <CompoundInterestCalculator />

        {/* Step by step */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Passo a passo para usar a calculadora de juros compostos
          </h2>
          <p className="text-foreground">
            Usar a calculadora de juros compostos para fazer cálculos financeiros
            (grátis e sem anúncios) é fácil. Confira o passo a passo:
          </p>

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

        {/* What is */}
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            O que são juros compostos?
          </h2>
          <p className="text-foreground">
            Juros compostos são os juros calculados sobre o valor inicial somado
            aos juros acumulados de períodos anteriores. Em outras palavras, são
            os famosos "juros sobre juros", responsáveis por acelerar o
            crescimento do seu patrimônio ao longo do tempo.
          </p>
          <p className="text-foreground">
            Esse é um dos conceitos mais poderosos do mundo dos investimentos:
            quanto mais tempo o dinheiro fica aplicado, maior o efeito do juro
            composto sobre o saldo final.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-primary py-6 text-center text-sm text-primary-foreground">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} iSardinha — Calculadora de Juros Compostos
        </div>
      </footer>
    </div>
  );
};

export default Index;
