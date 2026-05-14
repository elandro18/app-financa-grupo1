import Image from 'next/image'

export default function NotFound() {
    return (
        <div>
            {/* TO DO: transformar navbar em componente ou importar de lib */}
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
            <div className="flex h-screen items-center justify-center">
                <Image 
                    src="/404.png"
                    width={500}
                    height={500}
                    alt="404"
                    className=""
                />
                <h1 className='font-bold'>Página não encontrada</h1>
            </div> 
        </div>
    )
}