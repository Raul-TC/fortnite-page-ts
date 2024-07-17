import useLocaleDateConvert from '../hooks/useLocaleDateConvert';

interface DateComponentProps {
    fullDate: Date | string,
    dayss: number | string
}

const DateComponent = ({ fullDate, dayss }: DateComponentProps) => {
    const dayssNumber = typeof dayss === 'number' ? dayss : parseInt(dayss, 10);
    const dayOrDays = dayssNumber === 1 ? 'hace 1 día' : dayssNumber > 0 ? `hace ${dayssNumber} días` : 'Hoy'
    const baseClass = 'w-full text-left text-lg md:text-xl text-gray-500'
    const { handleLocalDate } = useLocaleDateConvert()

    return (
        <div className='flex w-full flex-row'>
            {
                fullDate === 'Cargando..'
                    ? <h1 className={`${baseClass} block w-full`}>Cargando Datos...</h1>
                    : dayssNumber < 1
                        ? <span className='block m-auto text-center md:text-2xl font-bold text-yellowFortnite'>¡En la Tienda Ahora!</span>
                        : (
                            <div className='w-full flex flex-col h-auto'>
                                <span className={`${baseClass} self-start`}>{handleLocalDate({ fecha: fullDate, onlyDate: true })}</span>
                                <span className='text-base text-white text-end w-full block'> {dayOrDays}</span>
                            </div>
                        )
            }
        </div>
    )
}

export default DateComponent