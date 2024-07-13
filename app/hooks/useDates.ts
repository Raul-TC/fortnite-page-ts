'use client'
import { useEffect, useMemo, useState } from 'react'

export function useDates() {
    const [currentShop, setCurrentShop] = useState<string | undefined>('')

    const day = useMemo(() => ({ date }: { date: string | Date }) => {
        const localDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Monterrey' }))
        if (localDate.getHours() < 18) {
            localDate.setDate(localDate.getDate() - 1)
        }
        localDate.setHours(18, 0, 0, 0)

        return localDate.toISOString().split('T')[0]
    }, [])

    useEffect(() => {
        const currentTime = new Date()
        setCurrentShop(day({ date: currentTime }))
    }, [day])

    return { currentShop }
}