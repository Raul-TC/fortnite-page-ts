'use client'
import { useEffect, useMemo, useState } from 'react'
import { DisplayAsset } from '../api/shop'

interface UseImageSliderProps {
    arrayImages: DisplayAsset[],
    displayName: string;
}

export function useImageSlider({ arrayImages, displayName }: UseImageSliderProps) {
    const [counter, setCounter] = useState(0)
    // const imagesMemo = useMemo(() => arrayImages, [arrayImages])


    const optimizedImages = useMemo(() => {
        return arrayImages.map((el, index) => ({
            ...el,
            key: `${index}_${displayName}`,
            isActive: counter === index
        }));
    }, [arrayImages, counter, displayName]);

    useEffect(() => {
        const slider = setInterval(() => {
            setCounter((prevCounter) =>
                prevCounter === arrayImages.length - 1 ? 0 : prevCounter + 1
            )
        }, 2000)

        return () => clearInterval(slider)

    }, [arrayImages.length])

    return { counter, optimizedImages }
}