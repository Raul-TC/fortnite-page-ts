'use client'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { TiMicrophone } from 'react-icons/ti'
import { TbLego, TbPick, TbParachute } from 'react-icons/tb'
import { FaMusic } from 'react-icons/fa6'
import { AiFillSkin } from 'react-icons/ai'
import { BsBackpack } from 'react-icons/bs'
import { MdOutlinePets } from 'react-icons/md'
import { BiSolidSprayCan } from 'react-icons/bi'
import { LuFlower } from 'react-icons/lu'
import gesto from '../assets/gestoSVG.svg'
import envoltorio from '../assets/wrapper.svg'
import pantalla from '../assets/pantallaCarga.svg'
import { Filters } from '../hooks/useCosmetics'
import { RarityType } from '../api/rarities'
function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
interface IconComponent {
    icon: JSX.Element;
    text: string;
}
const iconComponents: Record<string, IconComponent> = {
    'Música': { icon: <FaMusic />, text: 'Música' },
    'Pista de improvisación': { icon: <TiMicrophone />, text: 'Pista de improvisación' },
    'Kit de LEGO®': { icon: <TbLego />, text: 'Kit de LEGO®' },
    'Traje': { icon: <AiFillSkin />, text: 'Traje' },
    'Mochila': { icon: <BsBackpack />, text: 'Mochila' },
    'Pico': { icon: <TbPick />, text: 'Pico' },
    'Ala delta': { icon: <TbParachute />, text: 'Ala delta' },
    'Mascota': { icon: <MdOutlinePets />, text: 'Mascota' },
    'Grafiti': { icon: <BiSolidSprayCan />, text: 'Grafiti' },
    'Decoración': { icon: <LuFlower />, text: 'Decoración' },
    'Gesto': { icon: <img src={gesto.src} alt='' className='' />, text: 'Gesto' },
    'Envoltorio': { icon: <img src={envoltorio.src} alt='' className='' />, text: 'Envoltorio' },
    'Pantalla de carga': { icon: <img src={pantalla.src} alt='' className='' />, text: 'Pantalla de carga' }
}

interface MenuProps {
    nameType: string,
    index: number,
    value: RarityType[],
    expandedItem: boolean | number,
    handleFilters: ({ data }: { data: Filters }) => void,
    filters: Filters,
    handleExpandItem: ({ index }: { index: boolean | number }) => void,
}
const Menu = ({ nameType, index, value, expandedItem, handleFilters, filters, handleExpandItem }: MenuProps) => {
    return (
        <ul className='bg-yellowForrnite cursor-pointer relative rounded-md' onClick={() => handleExpandItem({ index })}>
            <div className='flex items-center justify-between '>

                <p className=' pl-6 pr-8 py-2  text-bg-header font-bold rounded-md overflow-hidden cursor-pointer'>{nameType.toUpperCase()}: {filters[nameType]}</p>

                {expandedItem === index ?
                    <IoIosArrowDown className={`text-bg-body mx-2 text-2xl absolute right-0 opacity-100 block ease-out transition-opacity`} />
                    :
                    <IoIosArrowUp className={`text-bg-body mx-2 text-2xl absolute right-0 opacity-100 block ease-out transition-opacity`} />
                }
            </div>

            <div className={`flex flex-col w-full bg-[#1c1c1c] scroll-m-1 absolute z-30 py-2 ${expandedItem === index ? 'opacity-100 block transition-opacity ease-out' : 'opacity-0 hidden'} `}>

                {value.map((el, index) => {
                    return (
                        <i
                            key={index} onClick={() => {
                                handleFilters({ data: { [nameType]: el.name } })
                                handleExpandItem({ index: !expandedItem })
                            }}
                            className='cursor-pointer flex gap-2 whitespace-nowrap overflow-hidden items-center  pl-4'
                        >
                            {iconComponents[el.name]
                                ? (
                                    <>
                                        <span className='min-w-4 w-4 h-4'>{iconComponents[el.name].icon}</span>
                                        <span className='text-ellipsis overflow-hidden'>{iconComponents[el.name].text}</span>
                                    </>
                                )
                                : (
                                    <>
                                        {el.colors?.Color1 && <span style={{ backgroundColor: `${el.colors?.Color1}` }} className='min-w-4 h-4 rounded-full block' />}
                                        <span className={`${el.colors?.Color1 ? 'text-ellipsis overflow-hidden pr-1' : 'm-auto'}`}>{capitalize(el.name)}</span>
                                    </>
                                )}
                        </i>
                    )
                })}
            </div>

        </ul>
    )
}

export default Menu