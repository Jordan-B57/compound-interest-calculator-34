import { Link, NavLink } from "react-router-dom";

const SiteHeader = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary-foreground/15"
        : "hover:bg-primary-foreground/10"
    }`;

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex flex-col items-stretch gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-primary-foreground text-primary">
            <span className="text-lg font-black">D</span>
          </div>
          <span className="text-lg font-bold leading-tight tracking-tight md:text-xl">
            Davyd Dunda
            <span className="block text-xs font-normal opacity-80">
              Planejamento Financeiro
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium md:gap-3">
          <NavLink to="/" end className={linkClass}>
            Início
          </NavLink>
          <NavLink to="/calculadoras" className={linkClass}>
            Calculadoras
          </NavLink>
          <a
            href="https://form.respondi.app/3BBS1W9K"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-primary-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground hover:text-primary"
          >
            Agende sua consultoria
          </a>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
