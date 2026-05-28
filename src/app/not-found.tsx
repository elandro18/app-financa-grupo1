'use client'; 
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className='flex flex-col items-center justify-center'>
            <nav className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16 p-4 bg-black text-white">
                {/* Logo/Branding */}
                <div className="text-xl font-bold">🟩 ByteFinanceBank</div>
        
                {/* Links do Menu */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base">
                <a href="#" className="hover:text-gray-300 cursor-pointer">Sobre</a>
                <a href="#" className="hover:text-gray-300 cursor-pointer">Serviços</a>
                </div>
                
                {/* Botões */}
                <div className="flex flex-wrap justify-center gap-3">
                <button className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-green-500 text-black rounded font-bold hover:bg-green-600 cursor-pointer">
                    Abrir minha conta
                </button>
                <button className="px-3 py-2 text-sm sm:px-4 sm:py-2 border border-white text-white rounded font-bold hover:bg-white hover:text-black cursor-pointer">
                    Já tenho conta
                </button>
                </div>
            </nav>
            <div className='flex flex-col items-center justify-center h-screen'>
                <div className="flex items-center">
                    <Image 
                        src="/404-img.png"
                        width={400}
                        height={400}
                        alt="404"
                        className=""
                    />
                    <h1 className='text-center text-2xl font-semibold leading-normal my-8'>Página não encontrada</h1>
                </div>
                <div className="flex">
                    <button 
                        className="px-3 py-8 text-sm sm:px-4 sm:py-2 bg-green-500 text-black rounded font-bold hover:bg-green-600 cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        Voltar
                    </button>
                </div>
            </div>   
        </div>
    )
}