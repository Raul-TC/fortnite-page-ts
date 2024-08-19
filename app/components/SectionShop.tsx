'use client'
import { useState, useCallback } from "react";
import Link from "next/link";
import { luckiestGuy } from "../assets/fonts";
import BackgroundCard from "./BackgroundCard";
import Image from "next/image";
import { ShopArray } from "../api/shop";
import { ImageSlider } from "./ImageSlider";
interface SectionShopProps {
    el: ShopArray
}
export const SectionShop = ({ el }: SectionShopProps) => {
    const initialVisibleItems = 10;
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems);

    const showMoreItems = useCallback(() => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + initialVisibleItems);
    }, []);

    const filteredData = el.data.slice(0, visibleItems);

    return (
        <section id={`${el.section}`} className='pb-4 w-full'>
            <h2 className={`${luckiestGuy.className} text-2xl text-center font-bold mt-4 mb-4 md:text-3xl `}>{el.section}</h2>
            <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 h-full w-full'>
                {filteredData.map((child, index) => {
                    return (
                        <Link
                            key={`${index}_${child.mainId}`}
                            href={`/cosmetics/${child.mainId}`}
                            className={`${child.displayName.includes('Lote') || child.displayName.includes('LOTE') || child.displayName.includes('PAQUETE') || child.displayName.includes('Pack') || el.section.includes('Lotes') ? 'col-span-2 row-span-2' : ''}  text-sm rounded-md overflow-hidden self-start cursor-pointer w-full hover:scale-110 active:scale-90 hover:z-40 transition-transform ease-in-out duration-200`}
                        >
                            {child.displayAssets.length > 1 ? (
                                <div className='flex w-full h-full overflow-hidden rounded-md flex-col items-center justify-center '>
                                    <div className='relative top-0 bottom-0 h-full w-full overflow-hidden z-0'>
                                        <ImageSlider
                                            key={`${index}_${child.mainId}`}
                                            displayName={child.displayName}
                                            arrayImages={child.displayAssets}
                                            price={child.price}
                                            isItem={false}
                                            bg={child.bg ?? child.bgDefault}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className='relative w-full h-full rounded-md' key={child.displayName}>
                                    {child.bg ? (
                                        <>
                                            <img src={child.displayAssets[0].url} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0 z-10' width={200} height={200} />
                                            <img src={child.bg} alt='' className='absolute top-0 bottom-0 left-0 right-0 z-0 w-full' width={200} height={200} />
                                        </>
                                    ) : (
                                        <img src={child.displayAssets[0]?.background} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0' width={200} height={200} />
                                    )}
                                    <BackgroundCard displayName={child.displayName} price={child.price} isFree='false' page="" />
                                </div>
                            )}
                        </Link>
                    )
                })}
            </div>
            {el.data.length > initialVisibleItems && visibleItems < el.data.length && (
                <div className='text-center mt-4'>
                    <button onClick={showMoreItems} className={`bg-yellowFortnite text-bg-header py-2 px-4 rounded font-bold hover:opacity-60  active:scale-95 transition-opacity ease-in-out duration-200`}>
                        Ver más
                    </button>
                </div>
            )}
        </section>
    );
};


