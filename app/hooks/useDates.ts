'use client'
import { useEffect, useMemo, useState } from 'react'

export function useDates({ date }: { date: string | Date }) {
    const [currentShop, setCurrentShop] = useState<string | undefined>('')

    const day = useMemo(() => ({ dateDay }: { dateDay: string | Date }) => {
        const localDate = new Date(dateDay.toLocaleString('en-US', { timeZone: 'America/Monterrey' }))
        if (localDate.getHours() < 18) {
            localDate.setDate(localDate.getDate() - 1)
        }
        // localDate.setHours(18, 0, 0, 0)
        return localDate.toISOString().split('T')[0]
    }, [])

    useEffect(() => {
        const currentTime = new Date()
        setCurrentShop(day({ dateDay: date ? date : currentTime }))
    }, [day])

    return { currentShop }
}