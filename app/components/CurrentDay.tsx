import { useFormatedEndDate } from "../hooks/useFormatedEndDate"
import { useGetDay } from "../hooks/useGetDays"

interface CurrentDayProps {
    date: string | Date,
    isShop: boolean,
    title?: string
}
const CurrentDay = ({ date, isShop, title }: CurrentDayProps) => {
    const { dateFormated } = useFormatedEndDate({ dateProp: date })

    const targetDate = dateFormated

    const { getDay } = useGetDay()
    const currentDate = dateFormated ? new Date(dateFormated).toLocaleDateString() : '';

    // Asegurarse de que targetDate es válido antes de pasarlo a getDay
    const dateDetails = targetDate ? getDay({ dia: targetDate }) : undefined;

    // Desestructurar solo si dateDetails existe y es válido
    const { days, day, months, year } = dateDetails || {};

    return (
        <div className='font-bold m-auto text-center flex-col  flex items-center justify-center'>
            <h1 className={`${isShop ? 'text-xl md:text-xl' : 'text-2xl'} text-lg font-bold self-start text-yellowForrnite italic`}>
                {currentDate === 'Invalid Date' || !dateDetails
                    ? 'Cargando Fecha'
                    : isShop
                        ? <>Tienda del {days} {day} {months} {year}</>
                        : <>{title}: {days} {day} {months} {year}</>}
            </h1>
        </div>
    )
}

export default CurrentDay