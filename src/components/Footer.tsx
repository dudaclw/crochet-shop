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
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-wine-700"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm0 18a8 8 0 0 1-4.07-1.11l-.29-.17-3 .79.8-2.92-.19-.3A7.98 7.98 0 1 1 20 12a8 8 0 0 1-8 8Zm4.38-5.96c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
            </svg>
            WhatsApp
          </a>
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-wine-700"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
            </svg>
            {config.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-line px-5 py-4 text-center text-xs text-ink-soft/80">
        {"© feito com <3 por @duarda12th"}
      </div>
    </footer>
  );
}
