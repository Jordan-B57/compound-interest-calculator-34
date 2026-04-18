import { Mail, Phone, Linkedin, Instagram, MapPin } from "lucide-react";
import davydPhoto from "@/assets/davyd.png";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <section>
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
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
