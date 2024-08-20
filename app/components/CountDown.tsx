'use client'

import React from "react"
import { luckiestGuy } from "../assets/fonts"
import { useCountDown } from "../hooks/useCountDown"

interface CountDowProps {
    date?: string | Date,
    isShop: boolean,
    message?: string
}
const CountDown = React.memo(({ date, isShop, message }: CountDowProps) => {
    const { days, hours, minutes, seconds } = useCountDown({ date, isShop })

    const formatTime = ({ time }: { time: number | string }) => time.toString().padStart(2, '0');

    const TimeComponent = React.memo(({ time, label }: { time: number, label: string }) => (
        <div className='flex flex-col items-center flex-wrap'>
            <span className='text-xl text-center px-2 md:text-3xl lg:text-xl'>
                {formatTime({ time })}
            </span>
            <span>{label}</span>
        </div>
    ))
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) return <h1 className="text-xl text-yellowFortnite font-bold my-4">{message}</h1>
    return (
        <div className={`${luckiestGuy.className} ${!isShop ? 'flex-wrap ' : ''} flex flex-col items-center justify-between text-yellowFortnite w-full ${!isShop ? 'my-4' : ''}`}>

            <span className={`${isShop ? 'text-4xl' : ''} block text-left text-base○`}> {isShop ? 'Siguiente Tienda' : 'Quedan:'}</span>
            {hours === 0 && minutes === 0 && seconds === 0
                ? (
                    <>
                        <h2 className='m-auto text-xl text-center px-2'>Cargando Contador⌛</h2>
                    </>
                )
                : (
                    <div className='flex justify-center items-center gap-4 w-full m-auto flex-wrap'>
                        {!isShop && <TimeComponent time={days} label={days === 1 ? 'Día' : 'Días'} />}
                        <TimeComponent time={hours} label={hours === 1 ? 'Hora' : 'Horas'} />
                        <TimeComponent time={minutes} label={minutes === 1 ? 'Minuto' : 'Minutos'} />
                        <TimeComponent time={seconds} label='Segundos' />
                    </div>
                )}
        </div>
    )
})

export default CountDown