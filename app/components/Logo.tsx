'use client'
import Image from 'next/image'
import Link from 'next/link'
import whiteModeLogo from '../assets/FortniteLogoWhite.svg'

const Logo = () => {
    return (
        <Link href='/'>
            <Image
                key='light'
                className='w-[150px] h-[60px]'
                src={whiteModeLogo}
                width={150}
                height={60}
                priority
                alt='logo_fortnite'
            />
        </Link>
    )
}

export default Logo