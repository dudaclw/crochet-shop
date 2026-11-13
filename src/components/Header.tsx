import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { config } from "../data/config";

const links = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/sobre", label: "Sobre" },
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `text-base hover:text-wine-700 active:text-wine-700 toque ${
    isActive ? "font-semibold text-wine-700" : "text-ink"
  }`;

// as 3 listrinhas viram um X: as de fora giram até o meio, a do meio encolhe e some
const listra = "h-0.5 w-6 rounded-full bg-ink transition duration-300 ease-out motion-reduce:transition-none";

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    if (!menuAberto) return;
    const fecharNoEsc = (e: KeyboardEvent) => e.key === "Escape" && setMenuAberto(false);
    addEventListener("keydown", fecharNoEsc);
    return () => removeEventListener("keydown", fecharNoEsc);
  }, [menuAberto]);

  return (
    <>
      {/* fora do header fixo: no celular a faixa some ao rolar e sobra mais tela pro conteúdo */}
      <div className="bg-wine-900 px-5 py-1.5 text-center text-xs font-semibold tracking-wide text-cream">
        Feito à mão, em pequenos lotes · combinamos tudo pelo WhatsApp
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 md:py-4">
          <NavLink
            to="/"
            className="flex items-center gap-3 toque"
            onClick={() => setMenuAberto(false)}
          >
            <img src={config.logoPlaceholder} alt="" className="h-10 w-10" />
            <span className="font-display text-lg text-ink">{config.nomeAtelie}</span>
          </NavLink>

          <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
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
            aria-controls="menu-celular"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full active:bg-wine-100 toque md:hidden"
          >
            <span className={`${listra} ${menuAberto ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`${listra} ${menuAberto ? "scale-x-0 opacity-0" : ""}`} />
            <span className={`${listra} ${menuAberto ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* sempre no DOM para animar: a altura vai de 0 ao conteúdo (grid 0fr → 1fr); fechado fica inert */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden ${
            menuAberto ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <nav
            id="menu-celular"
            aria-label="Principal"
            inert={!menuAberto}
            className="flex min-h-0 flex-col gap-1 overflow-hidden px-5"
          >
            <div className="mb-2 border-t border-line" />
            {links.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuAberto(false)}
                // links entram um após o outro ao abrir
                style={{ transitionDelay: menuAberto ? `${60 + i * 50}ms` : "0ms" }}
                className={({ isActive }) =>
                  `rounded-token-sm px-3 py-3 text-base transition duration-300 ease-out motion-reduce:transition-none last:mb-4 active:bg-wine-100 ${
                    menuAberto ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  } ${isActive ? "bg-wine-100 font-semibold text-wine-700" : "text-ink"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
