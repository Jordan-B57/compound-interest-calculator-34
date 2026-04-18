import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import { Mail, Phone, Linkedin, Instagram, MapPin } from "lucide-react";
import davydPhoto from "@/assets/davyd.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto flex flex-col items-stretch gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary-foreground text-primary">
              <span className="text-lg font-black">D</span>
            </div>
            <span className="text-lg font-bold leading-tight tracking-tight md:text-xl">
              Davyd Dunda
              <span className="block text-xs font-normal opacity-80">
                Planejamento Financeiro
              </span>
            </span>
          </a>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium md:gap-3">
            <a
              href="#inicio"
              className="rounded-md px-4 py-2 transition-colors hover:bg-primary-foreground/10"
            >
              Início
            </a>
            <a
              href="#calculadoras"
              className="rounded-md px-4 py-2 transition-colors hover:bg-primary-foreground/10"
            >
              Calculadoras
            </a>
            <a
              href="https://form.respondi.app/3BBS1W9K"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-primary-foreground bg-primary-foreground/0 px-4 py-2 transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              Agende sua consultoria
            </a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main id="inicio" className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        {/* Sobre mim */}
        <section className="mb-12">
          <div className="grid gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-2">
            <div className="order-2 flex flex-col justify-center p-6 md:order-1 md:p-10">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
                Sobre mim
              </p>
              <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Davyd Soares
              </h1>
              <p className="mb-4 text-foreground">
                Consultor financeiro, com atuação voltada ao desenvolvimento de
                hábitos financeiros saudáveis e organização da vida financeira.
              </p>
              <p className="mb-6 text-foreground">
                Trabalha com orientação prática sobre planejamento financeiro,
                controle de gastos e tomada de decisões financeiras conscientes,
                ajudando pessoas e organizações a reduzir o estresse financeiro
                e melhorar a qualidade de vida.
              </p>

              <div className="space-y-2 border-t border-border pt-5 text-sm text-foreground">
                <p className="mb-3 font-bold text-primary">Contato</p>
                <a
                  href="mailto:davyddunda.w1@gmail.com"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <Mail className="h-4 w-4" /> davyddunda.w1@gmail.com
                </a>
                <a
                  href="https://wa.me/5531984009079"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <Phone className="h-4 w-4" /> WhatsApp: (31) 98400-9079
                </a>
                <p className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn: Davyd Dunda
                </p>
                <p className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" /> Instagram: Dunda_dav
                </p>
                <p className="flex items-start gap-2 pt-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  Office JK — Rua Canopus, 11 · Sta. Lúcia · Belo Horizonte
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <img
                src={davydPhoto}
                alt="Davyd Soares - Consultor Financeiro"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
          Calculadora de Juros Compostos
        </h2>
        <p className="mb-8 text-muted-foreground">
          Simule os rendimentos dos seus investimentos com aportes mensais e veja
          o poder dos juros sobre juros ao longo do tempo.
        </p>

        <section id="calculadoras" className="scroll-mt-24">
          <CompoundInterestCalculator />
        </section>

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
          © {new Date().getFullYear()} Davyd Dunda — Planejamento Financeiro
        </div>
      </footer>
    </div>
  );
};

export default Index;
