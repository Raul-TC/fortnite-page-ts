'use client'
import { DisplayAsset } from '../api/shop'
import { useImageSlider } from '../hooks/useImageSlider'
import BackgroundCard from './BackgroundCard'
import Image from 'next/image'

interface ImageSliderProps {
    displayName: string,
    arrayImages: DisplayAsset[],
    price?: {
        regularPrice?: number,
        finalPrice: number,
        floorPrice?: number
    },
    isItem: boolean,
    bg: string

}
export const ImageSlider = ({ displayName, arrayImages, price, isItem, bg }: ImageSliderProps) => {
    const { optimizedImages } = useImageSlider({ arrayImages, displayName });

    return (
        <>
            {optimizedImages.map((el, index) => (
                bg
                    ? (
                        <div key={`${index}_${displayName}`} className=' overflow-hidden rounded-md'>

                            <img src={bg} alt='' className='absolute top-0 bottom-0 left-0 right-0 -z-0 h-full w-full' width={450} height={450} />
                            <img src={el.url} alt={`${el.materialInstance}`} className={`${el.isActive ? '  relative z-10' : ' hidden'} w-full h-full`} width={450} height={450} />

                        </div>
                    )
                    : <img key={`${displayName}_${index}`} src={el.background} alt={`${el.materialInstance}_`} className={`${el.isActive ? 'w-full' : 'hidden'} rounded-md `} width={450} height={450} />


            ))}
            {!isItem &&
                <>
                    <BackgroundCard displayName={displayName} price={price} isFree='false' page='' />
                </>
            }



        </>
    )

}
