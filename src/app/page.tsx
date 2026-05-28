import Image from "next/image";
import { GiftIcon } from '@heroicons/react/24/outline'
import { BanknotesIcon } from '@heroicons/react/24/outline'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { PublicNavbar } from "./_components/PublicNavbar";

export default function Home() {
  return (
    <div className="pai min-h-screen bg-slate-100 overflow-x-hidden">
      <PublicNavbar />

      <main className="items-center justify-center pt-18 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="max-w-2xl w-full px-2 sm:px-0">
            <h3 className="text-center text-4xl font-semibold leading-normal my-8">
              Experimente mais liberdade no controle da sua vida financeira.
            </h3>
            <h4 className="text-center text-4xl font-semibold leading-normal my-8 hidden lg:block">
              Crie sua conta com a gente!
            </h4>
          </div>
          <div className="flex justify-center lg:pr-20">
            <Image 
              src="/bytebank.png" 
              alt="Banco Digital" 
              width={500}
              height={500}
              className="w-full max-w-xl h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:px-18 lg:py-18 items-center">
          <div className="flex flex-col items-center px-4"> 
            <GiftIcon className="size-12 text-[var(--bb-warning)]"/>
            <h1 className="text-center text-lg pt-4">Conta e cartão gratuitos</h1>
            <p className="text-center text-sm pt-2">Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.</p>
          </div>
          <div className="flex flex-col items-center px-4">
            <BanknotesIcon className="size-12 text-[var(--bb-warning)]"/>
            <h1 className="text-center text-lg pt-4">Saques sem custo</h1>
            <p className="text-center text-sm pt-2">Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.</p>
          </div>
          <div className="flex flex-col items-center px-4">
            <CurrencyDollarIcon className="size-12 text-[var(--bb-warning)]"/>
            <h1 className="text-center text-lg pt-4">Programa de pontos</h1>
            <p className="text-center text-sm pt-2">Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!</p>
          </div>
          <div className="flex flex-col items-center px-4">
            <ComputerDesktopIcon className="size-12 text-[var(--bb-warning)]"/>
            <h1 className="text-center text-lg pt-4">Seguro Dispositivos</h1>
            <p className="text-center text-sm pt-2">Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.</p>
          </div>
        </div>
      </main>
    </div>
    
  );
}
