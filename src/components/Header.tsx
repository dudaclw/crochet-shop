import { useState } from "react";
import { NavLink } from "react-router-dom";
import { config } from "../data/config";

const links = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/sobre", label: "Sobre" },
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `text-base transition hover:text-sage-700 ${
    isActive ? "font-semibold text-sage-700" : "text-ink"
  }`;

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenuAberto(false)}
        >
          <img src={config.logoPlaceholder} alt="" className="h-10 w-10" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg text-ink">{config.nomeAtelie}</span>
            <span className="text-xs text-ink-soft">{config.tagline}</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((aberto) => !aberto)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-ink transition ${menuAberto ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-ink transition ${menuAberto ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-ink transition ${menuAberto ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuAberto && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 py-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuAberto(false)}
              className={({ isActive }) =>
                `rounded-token-sm px-3 py-2.5 text-base ${
                  isActive ? "bg-sage-100 font-semibold text-sage-700" : "text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
