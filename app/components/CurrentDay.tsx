'use client'
import { useDates } from "../hooks/useDates"
import { useFormatedEndDate } from "../hooks/useFormatedEndDate"
import { useGetDay } from "../hooks/useGetDays"

interface CurrentDayProps {
    date: string | Date,
    isShop: boolean
}
const CurrentDay = ({ date, isShop }: CurrentDayProps) => {
    const { dateFormated } = useFormatedEndDate({ dateProp: date })

    const { currentShop } = useDates()
    const targetDate = dateFormated || currentShop

    console.log(dateFormated)
    const { getDay, currentDate } = useGetDay()

    // Asegurarse de que targetDate es válido antes de pasarlo a getDay
    const dateDetails = targetDate ? getDay({ dia: targetDate }) : undefined;

    // Desestructurar solo si dateDetails existe y es válido
    const { days, day, months, year } = dateDetails || {};

    return (
        <div className='font-bold m-auto text-center flex-col  flex items-center justify-center'>
            <h1 className={`${isShop ? 'text-xl md:text-4xl' : 'text-2xl'} text-lg font-bold self-start`}>
                {currentDate === 'Invalid Date' || !dateDetails
                    ? 'Cargando Fecha'
                    : isShop
                        ? <>Tienda del {days} {day} {months} {year}</>
                        : <>Fin de Temporada: {days} {day} {months} {year}</>}
            </h1>
        </div>
    )
}

export default CurrentDay