import Image from "next/image";

export default function Home() {
  return (
    <div className="pai">
      <nav className="w-full flex items-center justify-center gap-16 p-4 bg-black text-white">
        {/* Logo/Branding */}
        <div className="text-xl font-bold">🟩 ByteFinanceBank</div>
  
        {/* Links do Menu */}
        <div className="flex gap-8">
          <a href="#" className="hover:text-gray-300 cursor-pointer">Sobre</a>
          <a href="#" className="hover:text-gray-300 cursor-pointer">Serviços</a>
        </div>
        
        {/* Botões */}
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-green-500 text-black rounded font-bold hover:bg-green-600 cursor-pointer">
            Abrir minha conta
          </button>
          <button className="px-4 py-2 border border-white text-white rounded font-bold hover:bg-white hover:text-black cursor-pointer">
            Já tenho conta
          </button>
        </div>
      </nav>   
      <main className="flex flex-col lg:flex-row items-center justify-center gap-4 pt-24">
        <div className=" max-w-2xl">
          <h3 className="text-center text-4xl font-semibold leading-normal my-8">
            Experimente mais liberdade no controle da sua vida financeira. 
          </h3>
          <h4 className="text-center text-4xl font-semibold leading-normal my-8 hidden lg:block">
            Crie sua conta com a gente!
          </h4>
        </div>
        <div className="flex justify-center">
          <Image 
            src="/bytebank1.png" 
            alt="Banco Digital" 
            width={500}
            height={500}
            className="w-full max-w-xl h-auto object-contain"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>
      </main>
    </div>
    
  );
}
