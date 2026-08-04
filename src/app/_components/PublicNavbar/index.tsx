import Link from "next/link";
import { AccountAccessButton } from "./AccountAccessButton";

/**
 * Shared navbar for public pages (home and not-found).
 * Server component — no client-side JS needed.
 * The logo is a Link so it works as a home anchor from any public page.
 */
export function PublicNavbar() {
  return (
    <nav className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16 p-4 bg-[var(--bb-primary)] text-white">
      {/* Logo — navigates to home */}
      <Link href="/" aria-label="Página inicial ByteFinanceBank">
        <img
          src="/bytebank-logo.svg"
          alt="ByteFinanceBank"
          width={146}
          height={32}
          className="h-8 w-auto object-contain"
        />
      </Link>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base">
        <Link href="/sobre" className="hover:text-gray-300">Sobre</Link>
        <Link href="/servicos" className="hover:text-gray-300">Serviços</Link>
      </div>

      {/* Botões */}
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/cadastro"
          className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-[var(--bb-warning)] text-[var(--bb-dark)] rounded font-bold hover:opacity-90"
        >
          Abrir minha conta
        </Link>
        <AccountAccessButton />
      </div>
    </nav>
  );
}
