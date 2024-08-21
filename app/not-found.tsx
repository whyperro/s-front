import Link from 'next/link'
import bg from '../public/404.png'
import { Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='h-dvh w-dvw flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-center max-w-xl gap-y-4'>
            <Plane className='size-[110px]' />
            <h1 className='font-bold text-7xl text-center'>¡No Encontrado!</h1>
            <p className='text-lg text-muted-foreground text-center'>Lo sentimos, pero la página que estabas buscando no pudo ser localizada. Es posible que se haya movido o ya no exista.</p>
            <Link href={'/dashboard'}>
                <Button className='bg-black text-white hover:bg-transparent hover:text-black hover:border hover:border-black'>Volver</Button>
            </Link>
        </div>
    </div>
  )
}