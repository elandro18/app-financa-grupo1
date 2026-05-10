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
      <main className="w-full flex items-center justify-center gap-8 p-8">
        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-6">
            Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
          </p>
        </div>        
        <div className="flex-1">         
          <Image 
            src="/bannerimage1.png" 
            alt="Banco Digital" 
            width={600}
            height={600}
            className=""
          />
        </div>
      </main>
    </div>
    
  );
}
