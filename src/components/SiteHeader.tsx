import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-md bg-primary/20 blur-sm" />
            <span className="relative font-display text-2xl leading-none text-primary">
              D
            </span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground md:text-base">
            Davyd Dunda<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={linkClass}>
            Início
          </NavLink>
          <NavLink to="/calculadoras" className={linkClass}>
            Calculadoras
          </NavLink>
          <a href="/#servicos" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            Serviços
          </a>
          <a href="/#processo" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            Processo
          </a>
        </nav>

        <a
          href="https://form.respondi.app/3BBS1W9K"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:shadow-glow md:inline-flex"
        >
          Fale com um especialista
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            <NavLink to="/" end onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface">
              Início
            </NavLink>
            <NavLink to="/calculadoras" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface">
              Calculadoras
            </NavLink>
            <a href="/#servicos" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface">
              Serviços
            </a>
            <a href="/#processo" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-surface">
              Processo
            </a>
            <a
              href="https://form.respondi.app/3BBS1W9K"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Fale com um especialista
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
