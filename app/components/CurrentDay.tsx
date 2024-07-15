// import { useFormatedEndDate } from "../hooks/useFormatedEndDate"
// import { useGetDay } from "../hooks/useGetDays"
import useLocaleDateConvert from "../hooks/useLocaleDateConvert"

interface CurrentDayProps {
    date: string | Date,
    isShop: boolean,
    title?: string
}
const CurrentDay = ({ date, isShop, title }: CurrentDayProps) => {
    // const { dateFormated } = useFormatedEndDate({ dateProp: date })
    const { handleLocalDate } = useLocaleDateConvert()

    // const { currentShop } = useDates({ date: date ?? '' })
    // console.log(dateFormated)

    // const targetDate = currentShop 

    // const { getDay } = useGetDay()
    // const currentDate = currentShop ? currentShop : '';

    // Asegurarse de que targetDate es válido antes de pasarlo a getDay
    // const dateDetails = currentShop ? getDay({ dia: currentShop }) : undefined;
    // Desestructurar solo si dateDetails existe y es válido
    // const { days, day, months, year } = dateDetails || {};

    return (
        <div className='font-bold m-auto text-center flex-col  flex items-center justify-center'>
            <h1 className={`${isShop ? 'text-xl md:text-xl' : 'text-2xl'} text-lg font-bold self-start text-white `}>
                {!date
                    ? 'Cargando Fecha...'
                    : <><span className="text-gray-500">{title}:</span> {handleLocalDate({ fecha: date, onlyDate: false })}</>}
                {/* : <>{title}: {days} {day} {months} {year}</>} */}
            </h1>
        </div>
    )
}

export default CurrentDay