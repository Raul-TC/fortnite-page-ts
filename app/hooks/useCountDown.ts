'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface CountDownProps {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}
export function useCountDown({ isShop, date = '' }: { isShop: boolean, date?: string | Date }) {
    const [time, setTime] = useState<CountDownProps>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })


    const getTime = useCallback(() => {

        const defaultDate = new Date()
        const newDate = new Date(isShop ? defaultDate : date)

        if (isShop) {
            if (newDate.getHours() >= 18) {
                newDate.setDate(newDate.getDate() + 1)
            }
            newDate.setHours(18, 0, 0, 0)
        }


        const remainingTime = Date.parse(newDate.toString()) - Date.now()
        const days = Math.floor((remainingTime / (1000 * 60 * 60 * 24)))
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60)
        const seconds = Math.floor((remainingTime / 1000) % 60)

        setTime({ days, hours, minutes, seconds })

        if (hours === 0 && minutes === 0 && seconds === 0) {
            setTimeout(() => {
                window.location.reload()
            }, 10000)
        }

    }, [date])

    useEffect(() => {
        const interval = setInterval(getTime, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [getTime])

    return time
}