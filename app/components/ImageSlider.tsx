'use client'
import { DisplayAsset } from '../api/shop'
import { useImageSlider } from '../hooks/useImageSlider'
import BackgroundCard from './BackgroundCard'

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

    console.log({ optimizedImages })
    return (
        <>
            {optimizedImages.map((el, index) => (
                bg
                    ? (
                        <div
                            key={`${index}_${displayName}`}
                            className={`absolute rounded-md transition-opacity duration-700 ease-in w-full h-full top-0 left-0 bottom-0 right-0 z-10 aspect-square ${el.isActive ? '  opacity-100 ' : ' opacity-0'} `}>

                            <img
                                src={bg}
                                alt=''
                                className={`absolute top-0 bottom-0 left-0 right-0 w-full h-full cover`}
                            />
                            <img
                                src={el.url}
                                alt={`${el.materialInstance}`}
                                className={`${el.isActive ? '  opacity-100 ' : ' opacity-0 '} absolute z-30 top-0 left-0 bottom-0 right-0 transition-opacity duration-700 ease-in w-full h-full`} />

                        </div>
                    )
                    :
                    <img
                        key={`${displayName}_${index}`}
                        src={el.background}
                        alt={`${el.materialInstance}_`}
                        className={`transition-opacity duration-500 ease-in w-full h-full top-0 left-0 bottom-0 right-0 rounded-md absolute ${el.isActive ? 'opacity-100' : 'opacity-0'} `}
                    />


            ))}
            {!isItem &&
                <>
                    <BackgroundCard displayName={displayName} price={price} isFree='false' page='' />
                </>
            }



        </>
    )

}
