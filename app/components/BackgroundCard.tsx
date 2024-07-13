import Image from 'next/image'
import React from 'react'
import vBuck from '../assets/vBuckPNG.png'

interface Props {
    displayName: string,
    price?: {
        regularPrice?: number,
        finalPrice: number,
        floorPrice?: number
    } | undefined,
    isFree: string,
    page?: string
}
const BackgroundCard = React.memo(({ displayName, price, isFree, page }: Props) => {
    const isOfert = price?.finalPrice !== undefined && price?.regularPrice !== undefined && price.finalPrice < price.regularPrice;
    return (
        <div
            className='bg-black bg-opacity-60 w-full h-14 absolute z-10 bottom-0 left-0 flex flex-col items-center justify-center '
        >
            <span className='absolute w-full text-center text-white font-bold opacity-100 capitalize  px-1 py-2'>{displayName.toLowerCase()}</span>
            <div className='absolute bottom-0 flex items-center pr-1 self-end right-0 gap-1 '>
                {price?.regularPrice !== 0 ? <span className=' text-white font-bold text-xs md:text-base '>{isOfert ? <span><span className='line-through opacity-30'>{price?.regularPrice}</span> <span>{price.finalPrice}</span></span> : price?.regularPrice}</span> : <span>0</span>}
                {!price?.regularPrice && page === 'bp' && <span className=' text-white font-bold mr-2 opacity-60'>{isFree === 'free' ? 'Gratis' : '🔒'}</span>}
                {price?.regularPrice && <Image src={vBuck} alt='vBuck_coin' width={50} height={50} className='w-3 h-3 md:w-3 md:h-3 ' />}
            </div>
        </div>
    )
})

BackgroundCard.displayName = 'BackgroundCard'

export default BackgroundCard