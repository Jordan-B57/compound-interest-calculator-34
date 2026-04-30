import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

const SiteFooter = () => (
  <footer className="mt-24 border-t border-border/40 bg-background">
    <div className="container mx-auto px-4 py-16">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="font-display text-3xl text-primary">D</span>
            <span className="text-base font-semibold tracking-tight">
              Davyd Dunda<span className="text-primary">.</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md font-display text-2xl leading-tight text-foreground md:text-3xl">
            Clareza, estratégia e proteção para o seu patrimônio.
          </p>
          <a
            href="https://form.respondi.app/3BBS1W9K"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-glow"
          >
            Agende uma conversa
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Navegar
          </p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-foreground/80 hover:text-primary">Início</Link></li>
            <li><Link to="/calculadoras" className="text-foreground/80 hover:text-primary">Calculadoras</Link></li>
            <li><a href="/#servicos" className="text-foreground/80 hover:text-primary">Serviços</a></li>
            <li><a href="/#processo" className="text-foreground/80 hover:text-primary">Processo</a></li>
            <li><a href="/#faq" className="text-foreground/80 hover:text-primary">Perguntas frequentes</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Contato
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://wa.me/5531984009079" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary">
                <Phone className="h-4 w-4" /> (31) 98400-9079
              </a>
            </li>
            <li>
              <a href="mailto:davyddunda.w1@gmail.com" className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary">
                <Mail className="h-4 w-4" /> davyddunda.w1@gmail.com
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-foreground/80">
              <Linkedin className="h-4 w-4" /> Davyd Dunda
            </li>
            <li className="inline-flex items-center gap-2 text-foreground/80">
              <Instagram className="h-4 w-4" /> @dunda_dav
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Planejamento Financeiro. Todos os direitos reservados.</p>
        <p>Belo Horizonte · MG</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
