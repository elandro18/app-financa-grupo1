import Image from 'next/image'

export default function NotFound() {
    return (
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
    )
}