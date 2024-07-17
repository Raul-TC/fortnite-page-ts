import useLocaleDateConvert from "../hooks/useLocaleDateConvert"

interface CurrentDayProps {
    date: string | Date,
    isShop: boolean,
    title?: string
}
const CurrentDay = ({ date, isShop, title }: CurrentDayProps) => {
    const { handleLocalDate } = useLocaleDateConvert()
    return (
        <div className='font-bold m-auto text-center flex-col  flex items-center justify-center'>
            <h1 className={`${isShop ? 'text-xl md:text-xl' : 'text-2xl'} text-lg font-bold self-start text-white `}>
                {!date
                    ? 'Cargando Fecha...'
                    : <><span className="text-gray-500">{title}:</span> {handleLocalDate({ fecha: date, onlyDate: false })}</>
                }
            </h1>
        </div>
    )
}

export default CurrentDay