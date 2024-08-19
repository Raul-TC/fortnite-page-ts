'use client'
import Link from 'next/link'
import { useToggle } from '../hooks/useToggle'
import HamburguerMenu from './HamburguerMenu'
import playerIcon from '../assets/streamline_controller-solid.svg'
import cosmeticsIcon from '../assets/ant-design_skin-filled.svg'
import shopIcon from '../assets/shopSVG.svg'
import homeIcon from '../assets/ion_home-sharp.svg'

const links = [
    {
        name: 'Inicio', path: '/', icon: homeIcon.src
    },
    {
        name: 'Tienda', path: '/shop/', icon: shopIcon.src
    },
    {
        name: 'Cosmeticos', path: '/cosmetics', icon: cosmeticsIcon.src,
    },
    {
        name: 'Jugador', path: '/player', icon: playerIcon.src
    }
]
const NavMenu = () => {
    const { state, handleToggle } = useToggle()

    return (
        <>
            <HamburguerMenu state={state} handleToggle={handleToggle} />
            {state &&
                <ul className='fixed w-full bg-bg-header p-4 left-0 right-0 bottom-0 top-0 z-[80] flex flex-col items-center justify-between py-16'>
                    {links.map((item, index) => (
                        <Link key={`${index}_${item.name}`} href={item.path} className='px-2'>
                            <div onClick={handleToggle} className='flex items-center justify-between gap-4'>
                                <img src={item.icon} alt={`${item.name}_${index}`} className='w-7 h-7' />
                                <li >{item.name}</li>
                            </div>
                        </Link>
                    )
                    )}
                </ul>}

            <ul className='md:flex gap-6 font-semibold items-center hidden'>
                {links.map((item, index) => (
                    <Link key={`${index}_${item.name}_${crypto.randomUUID()}`} href={item.path} className='px-2 hover:text-yellowFortnite transition-colors ease-out duration-200' >
                        <li>{item.name}</li>
                    </Link>
                ))}
            </ul>
        </>
    )
}

export default NavMenu