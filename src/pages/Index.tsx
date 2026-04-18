import { Mail, Phone, Linkedin, Instagram, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import davydPhoto from "@/assets/davyd-venice.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto max-w-6xl px-4 py-10 md:py-16">
        <section aria-labelledby="sobre-mim-title">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Sobre mim
            </p>
            <h1
              id="sobre-mim-title"
              className="mb-3 text-3xl font-bold leading-tight text-foreground md:text-5xl"
            >
              Clareza financeira para decisões que mudam a sua vida
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              Organização, planejamento e proteção do seu patrimônio — feitos
              sob medida para a sua realidade.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-5 md:gap-12">
            {/* Foto + frase de destaque */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl bg-primary/10 blur-xl" />
                <img
                  src={davydPhoto}
                  alt="Davyd Dunda, consultor financeiro, sorrindo em um canal de Veneza"
                  className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-lg"
                  loading="eager"
                />
                <figcaption className="relative mt-4 rounded-xl border-l-4 border-primary bg-card px-4 py-3 text-sm italic text-foreground shadow-sm">
                  “Dinheiro organizado é liberdade para viver o que importa.”
                  <span className="mt-1 block text-xs not-italic font-semibold text-primary">
                    — Davyd Dunda
                  </span>
                </figcaption>
              </div>
            </div>

            {/* Texto principal */}
            <div className="md:col-span-3">
              <div className="space-y-4 text-base leading-relaxed text-foreground md:text-[17px]">
                <p>
                  A maioria das pessoas não tem um problema de quanto ganha —
                  tem um problema de <strong>clareza</strong>. Falta enxergar
                  para onde o dinheiro está indo, faltam decisões com
                  segurança, sobra a sensação de que sempre poderia render
                  mais.
                </p>
                <p>
                  Sou <strong>Davyd Dunda</strong>, consultor financeiro. Aos
                  29 anos, ajudo pessoas e empresas a colocarem a vida
                  financeira em ordem, traçarem um plano realista e
                  protegerem o que já construíram.
                </p>
                <p>
                  Na prática, trabalho em três frentes:{" "}
                  <strong>organização financeira</strong> (saber exatamente
                  onde você está hoje), <strong>planejamento estratégico</strong>{" "}
                  (definir para onde quer chegar e como) e{" "}
                  <strong>blindagem patrimonial</strong> (proteger sua família
                  e seus bens dos imprevistos).
                </p>
                <p>
                  Não acredito em fórmulas mágicas nem em planilhas genéricas.
                  Cada consultoria é construída a partir da sua realidade, dos
                  seus objetivos e do seu momento de vida — porque é isso que
                  gera resultado de verdade.
                </p>
                <p className="text-muted-foreground">
                  Se você sente que está na hora de assumir o controle, vamos
                  conversar.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://form.respondi.app/3BBS1W9K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Agende sua consultoria
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/calculadoras"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Ver calculadoras
                </Link>
              </div>

              {/* Contato */}
              <div className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-foreground">
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
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
