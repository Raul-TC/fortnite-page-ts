'use client'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import decoration from '../assets/decoration.svg'
import gesto from '../assets/gestoSVG.svg'
import envoltorio from '../assets/wrapper.svg'
import skin from '../assets/skin.svg'
import spray from '../assets/spray.svg'
import pantalla from '../assets/pantallaCarga.svg'
import mochila from '../assets/mochila.svg'
import lego from '../assets/lego.svg'
import musica from '../assets/musica.svg'
import pets from '../assets/pets.svg'
import delta from '../assets/delta.svg'
import microphone from '../assets/microphone.svg'
import pico from '../assets/pico.svg'
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
    'Música': { icon: <img src={musica.src} />, text: 'Música' },
    'Pista de improvisación': { icon: <img src={microphone.src} />, text: 'Pista de improvisación' },
    'Kit de LEGO®': { icon: <img src={lego.src} alt='' className='' />, text: 'Kit de LEGO®' },
    'Traje': { icon: <img src={skin.src} />, text: 'Traje' },
    'Picos': { icon: <img src={pico.src} />, text: 'Pico' },
    'Mascota': { icon: <img src={pets.src} />, text: 'Mascota' },
    'Ala delta': { icon: <img src={delta.src} />, text: 'Ala delta' },
    'Mochila': { icon: <img src={mochila.src} alt='' className='' />, text: 'Mochila' },
    'Decoración': { icon: <img src={decoration.src} alt='' className='' />, text: 'Decoración' },
    'Grafiti': { icon: <img src={spray.src} alt='' className='text-white' />, text: 'Grafiti' },
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
        <ul className='bg-yellowFortnite cursor-pointer relative rounded-md' onClick={() => handleExpandItem({ index })}>
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