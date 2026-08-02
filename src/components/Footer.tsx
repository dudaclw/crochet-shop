import { config } from "../data/config";

export function Footer() {
  const whatsappLink = `https://wa.me/${config.whatsappNumero}`;
  const instagramLink = `https://instagram.com/${config.instagramHandle.replace("@", "")}`;

  return (
    <footer className="border-t border-line bg-linen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={config.logoPlaceholder} alt="" className="h-10 w-10" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg text-ink">{config.nomeAtelie}</span>
            <span className="text-sm text-ink-soft">{config.tagline}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-ink-soft">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-sage-700">
            WhatsApp
          </a>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="hover:text-sage-700">
            Instagram {config.instagramHandle}
          </a>
          <span>{config.horarioAtendimento}</span>
        </div>
      </div>
    </footer>
  );
}
