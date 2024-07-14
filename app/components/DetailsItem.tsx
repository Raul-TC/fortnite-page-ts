import { getItem } from '../services/fetchData'
import { useFormatedDate } from '../hooks/useFormatedDate'
import { luckiestGuy } from '../assets/fonts'
import { ImageSlider } from './ImageSlider'
import { MdOutlineImageNotSupported } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import BackgroundCard from './BackgroundCard'
import vBuck from '../assets/vBuckPNG.png'
import History from './History'


interface DetailsItemsProps {
    itemID: string
}
type RarityType = 'Common' | 'Rare' | 'Uncommon' | 'Epic' | 'Legendary';


const DetailsItem = async ({ itemID }: DetailsItemsProps) => {

    const { formatedDate } = useFormatedDate()
    const { id, name, description, introduction, releaseDate, shopHistory, series, type, set, images, displayAssets, rarity, price, bg, grants, battlepass, added } = await getItem({ idSkin: itemID })

    const rarityColorMap = {
        Common: 'border-green-500',
        Rare: 'border-blue-500',
        Uncommon: 'border-gray-500',
        Epic: 'border-purple-500',
        Legendary: 'border-orange-500'
    }

    function capitalize({ str }: { str: string }) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }

    const rarityColor = rarityColorMap[rarity.id as RarityType] || ''
    return (
        <>
            {bg && <img src={bg} className='fixed bottom-0 w-full left-0 object-cover top-0 h-[100vh] -z-0 opacity-55 blur-sm' alt='' />}
            <div className={`${rarityColor} border-b-2 pb-4 relative top-0 left-0 right-0 w-full shadow-md text-4xl font-bold text-center flex flex-col `}>
                <div className='w-28 h-28 rounded-full m-auto overflow-hidden'>
                    <img src={images?.icon || displayAssets[0]?.url} alt='' className='border-spacing-2 border-gray-400' />
                </div>
                <span className={`${luckiestGuy.className}`}>   {name}</span>
                <span className='text-lg'>{description}</span>
            </div>

            <div className='flex flex-col items-center m-auto mt-4 w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)] mb-16 relative'>
                <div className='grid grid-cols-1 items-center justify-center w-full rounded-md md:grid-cols-2'>
                    <div className='flex flex-col items-center justify-center w-full'>
                        {displayAssets.length > 1
                            ? (
                                <div className='relative w-full h-full overflow-hidden rounded-md'>
                                    <div className='relative w-full h-full overflow-hidden'>
                                        <ImageSlider displayName={name} arrayImages={displayAssets} key={`${id}`} price={price} isItem bg={bg} />
                                    </div>
                                </div>
                            )
                            : displayAssets.length > 0 || images.full_background
                                ? (
                                    <div className='relative w-full h-full rounded-md overflow-hidden'>
                                        {bg !== ''
                                            ? (
                                                <>
                                                    <img src={displayAssets.length > 0 ? displayAssets[0].url : images.icon} alt={`image_${name}`} className='w-full h-full rounded-md relative  z-20' />
                                                    <img src={bg} alt='' className='w-full h-full absolute top-0 z-0 ' />
                                                </>
                                            )
                                            : <img src={displayAssets.length > 0 ? displayAssets[0].background : images.background} alt={`image_${name}`} className='w-full h-full rounded-md relative  z-20' />}
                                    </div>
                                )
                                : (
                                    <div className='relative w-full h-full '>
                                        <MdOutlineImageNotSupported className='w-full h-full rounded-md' />
                                    </div>
                                )}
                    </div>
                    <div className='w-full flex justify-around flex-col items-center gap-4 md:self-start md:pl-32 pt-4 opacity-100'>
                        {type && <p className=' font-bold md:text-2xl text-left self-start text-gray-500'>Tipo: <span className='text-white'>{capitalize({ str: type.name })}</span></p>}
                        {rarity && <p className=' font-bold md:text-2xl text-left self-start text-gray-500 capitalize'>Rareza: <span className='text-white'>{capitalize({ str: rarity.name })}</span></p>}
                        {price.finalPrice !== 0 && (
                            <div className='flex flex-row self-start items-center justify-center gap-1'>
                                <p className=' font-bold md:text-2xl text-left text-gray-500'>Precio: <span className='text-white'>{price.finalPrice}</span>
                                </p>
                                <Image src={vBuck} alt='vBuck_coin' width={50} height={50} className='w-9 h-9' />
                            </div>)}
                        {(releaseDate || added) && <p className=' font-bold md:text-2xl text-left self-start text-gray-500'>Primera Aparición: <span className='text-white'>{formatedDate({ date: new Date(releaseDate || added.date) }).replaceAll('-', '.')}</span></p>}
                        {(introduction) && <p className=' font-bold md:text-2xl text-left self-start text-gray-500'>Aparición: <span className='text-white'>{introduction?.chapter} {introduction?.season}</span> </p>}
                        {battlepass && <p className=' font-bold md:text-2xl text-left self-start text-gray-500'>Skin de pase de Batalla: <span className='text-white'>{battlepass?.displayText.chapter} {battlepass?.displayText.season}</span> </p>}
                        {battlepass && <p className=' font-bold md:text-2xl text-left self-start text-gray-500'>Metodo de Obtención: <span className='text-white'>{battlepass.type === 'paid' ? 'Comprando el Pase' : 'Gratis en el Pase'} </span> </p>}
                        {battlepass && <p className=' font-bold md:text-2xl text-left self-start text-gray-500'>Página: <span className='text-white'>{battlepass.page}</span> </p>}
                        {series && <p className=' font-bold text-center md:text-2xl text-gray-500 self-start'>Serie:<span className='self-start font-normal capitalize'> <span className='text-white'>{(series.name).substring(6)}</span></span></p>}
                        <div className='flex flex-col h-full w-full justify-center items-start'>
                            <History shopHistory={shopHistory} />
                        </div>
                    </div>
                </div>
                {grants.length > 0 &&
                    <>
                        <h2 className='text-2xl mt-8 mb-8 font-bold'>Partes del Set {set ? set.name : name}</h2>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-between '>
                            {grants?.map((el, index) => {
                                return (
                                    <Link href={`/cosmetics/${el.id}`} key={index} className='relative w-full rounded-md overflow-hidden'>
                                        {el.images.icon_background
                                            ? (
                                                <>
                                                    {bg !== ''
                                                        ? (
                                                            <div className='relative w-full h-full z-10'>
                                                                <img src={bg} alt='' className='w-full h-full absolute top-0 z-0 ' />
                                                                <img src={el.images.icon} alt={`${el.type.id}_${index}`} className='w-full h-full rounded-md relative z-20' />
                                                            </div>
                                                        )
                                                        : <img src={el.images.icon_background} alt={`${el.type.id}_${index}`} className='w-full h-full rounded-md' />}
                                                    <BackgroundCard displayName={el.name} isFree='false' page='' />
                                                </>
                                            )
                                            : (
                                                <div className='relative w-full h-full '>
                                                    <MdOutlineImageNotSupported className='w-full h-full rounded-md' />
                                                </div>
                                            )}
                                    </Link>
                                )
                            })}
                        </div>
                    </>}
            </div>
        </>
    )
}

export default DetailsItem