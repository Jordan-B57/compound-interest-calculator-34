import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Target,
  Shield,
  Plus,
  Minus,
  Mail,
  Phone,
} from "lucide-react";
import heroAbstract from "@/assets/hero-abstract.jpg";
import davydPhoto from "@/assets/davyd-venice.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const servicos = [
  {
    icon: Compass,
    title: "Organização financeira",
    description:
      "Diagnóstico completo do seu momento atual: receitas, despesas, dívidas e investimentos. Você passa a enxergar com clareza para onde o dinheiro vai e qual o próximo passo.",
  },
  {
    icon: Target,
    title: "Planejamento estratégico",
    description:
      "Construímos juntos um plano realista para os seus objetivos: comprar um imóvel, viver de renda, abrir uma empresa ou se aposentar com tranquilidade.",
  },
  {
    icon: Shield,
    title: "Blindagem patrimonial",
    description:
      "Estruturação para proteger o que você já construiu de imprevistos, processos e instabilidades. Sua família com mais segurança e o seu patrimônio resguardado.",
  },
];

const processo = [
  {
    step: "01",
    title: "Conversa inicial",
    description:
      "Uma reunião sem custo para entender o seu momento, seus objetivos e ver se faz sentido seguirmos juntos.",
  },
  {
    step: "02",
    title: "Diagnóstico",
    description:
      "Mapeamos sua vida financeira por completo: patrimônio, fluxo, riscos e oportunidades.",
  },
  {
    step: "03",
    title: "Plano sob medida",
    description:
      "Você recebe um plano personalizado, com prioridades claras e ações práticas para começar a executar.",
  },
  {
    step: "04",
    title: "Acompanhamento",
    description:
      "Revisões periódicas para ajustar a rota conforme a vida muda e garantir que os objetivos sejam alcançados.",
  },
];

const faq = [
  {
    q: "Para quem é a consultoria?",
    a: "Para pessoas e empresas que querem assumir o controle da vida financeira, planejar com seriedade e proteger o patrimônio. Não importa o tamanho do seu patrimônio hoje, mas sim o seu compromisso com o próximo passo.",
  },
  {
    q: "Como funciona o atendimento?",
    a: "O atendimento é 100% personalizado. Começamos com uma conversa inicial gratuita, seguimos com um diagnóstico completo e construímos um plano sob medida para a sua realidade.",
  },
  {
    q: "Vocês indicam produtos financeiros?",
    a: "O foco da consultoria é estratégia: organizar, planejar e proteger. Quando faz sentido, indicamos caminhos e estruturas, sempre alinhados ao seu objetivo, nunca a comissões.",
  },
  {
    q: "Quanto tempo até ver resultado?",
    a: "Clareza você sente já nas primeiras semanas. Os resultados financeiros aparecem com a execução consistente do plano ao longo dos meses e anos.",
  },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <img
          src={heroAbstract}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="container relative mx-auto px-4 pb-24 pt-20 md:pb-40 md:pt-32">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
              Consultoria financeira independente
            </div>

            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]">
              Transforme cada{" "}
              <span className="italic text-primary">objetivo</span>{" "}
              em uma{" "}
              <span className="italic">conquista</span>{" "}
              real.
            </h1>

            <p className="mt-7 max-w-2xl text-base text-foreground/70 md:text-lg">
              Organização, planejamento e blindagem do seu patrimônio em uma
              consultoria 100% personalizada. Decisões com clareza, sem
              fórmulas mágicas.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://form.respondi.app/3BBS1W9K"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:shadow-glow"
              >
                Fale com um especialista
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                to="/calculadoras"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                Calculadoras gratuitas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/40 bg-border/40 md:mt-28 md:grid-cols-4">
            {[
              { v: "+5 anos", l: "no mercado financeiro" },
              { v: "100%", l: "atendimento personalizado" },
              { v: "3 frentes", l: "organização, plano e blindagem" },
              { v: "0 comissão", l: "consultoria independente" },
            ].map((s) => (
              <div key={s.l} className="bg-background p-6 md:p-8">
                <p className="font-display text-3xl text-primary md:text-4xl">{s.v}</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground md:text-sm md:normal-case md:tracking-normal">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
              <img
                src={davydPhoto}
                alt="Davyd Dunda, consultor financeiro"
                className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-elevated"
                loading="lazy"
              />
            </div>
            <figure className="mt-6 border-l-2 border-primary pl-5">
              <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
                "Dinheiro organizado é liberdade para viver o que importa."
              </p>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Davyd Dunda · Consultor financeiro
              </figcaption>
            </figure>
          </div>

          <div className="md:col-span-7 md:pt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Sobre mim
            </p>
            <h2 className="mb-8 font-display text-4xl leading-tight text-foreground md:text-5xl">
              A maioria das pessoas não tem um problema de quanto ganha.
              Tem um problema de <em className="text-primary">clareza</em>.
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-foreground/75 md:text-lg">
              <p>
                Falta enxergar para onde o dinheiro está indo, faltam decisões
                com segurança, sobra a sensação de que sempre poderia render
                mais.
              </p>
              <p>
                Sou <strong className="text-foreground">Davyd Dunda</strong>,
                consultor financeiro. Aos 29 anos, ajudo pessoas e empresas a
                colocarem a vida financeira em ordem, traçarem um plano
                realista e protegerem o que já construíram.
              </p>
              <p>
                Não acredito em fórmulas mágicas nem em planilhas genéricas.
                Cada consultoria é construída a partir da sua realidade, dos
                seus objetivos e do seu momento de vida — porque é isso que
                gera resultado de verdade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="border-t border-border/40 bg-surface/30 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                O que eu faço
              </p>
              <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
                Três frentes para uma vida financeira sólida.
              </h2>
            </div>
            <p className="max-w-md text-foreground/70">
              Cada serviço pode ser contratado de forma independente ou como
              parte de uma consultoria completa.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {servicos.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.title}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card-gradient p-7 transition-all hover:border-primary/60"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/70">{s.description}</p>
                  <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="container mx-auto px-4 py-24 md:py-32">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Como funciona
          </p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Um processo simples e transparente.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-2 lg:grid-cols-4">
          {processo.map((p) => (
            <div key={p.step} className="bg-background p-8 transition-colors hover:bg-surface/60">
              <p className="font-display text-5xl text-primary/40">{p.step}</p>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border/40 bg-surface/30 py-24 md:py-32">
        <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              FAQ
            </p>
            <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
              Perguntas frequentes
            </h2>
            <p className="mt-5 text-foreground/70">
              Não encontrou o que procurava?{" "}
              <a
                href="https://wa.me/5531984009079"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow"
              >
                Fale comigo no WhatsApp.
              </a>
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="divide-y divide-border/60 border-y border-border/60">
              {faq.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.q}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-base font-medium text-foreground md:text-lg">{item.q}</span>
                      {isOpen ? (
                        <Minus className="h-5 w-5 shrink-0 text-primary" />
                      ) : (
                        <Plus className="h-5 w-5 shrink-0 text-foreground/60" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-foreground/70 md:text-base">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card-gradient p-10 md:p-16">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "hsl(var(--primary) / 0.4)" }}
          />
          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Próximo passo
            </p>
            <h2 className="font-display text-4xl leading-tight text-foreground md:text-6xl">
              Pronto para assumir o controle da sua vida financeira?
            </h2>
            <p className="mt-6 max-w-xl text-foreground/70 md:text-lg">
              Agende uma conversa inicial sem custo. Em 30 minutos você sai com
              clareza sobre os próximos passos — independentemente de
              seguirmos juntos.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://form.respondi.app/3BBS1W9K"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:shadow-glow"
              >
                Agendar consultoria
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/5531984009079"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                WhatsApp direto
              </a>
              <a
                href="mailto:davyddunda.w1@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                E-mail
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
