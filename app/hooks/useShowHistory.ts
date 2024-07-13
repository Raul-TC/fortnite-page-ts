import { useEffect, useState } from 'react'


export function useShowHistory({ shopHistory }: { shopHistory: Date[] }) {
    const [showHistory, setShowHistory] = useState<boolean>(false)
    const [reversedHistory, setReversedHistory] = useState<Date[] | undefined>([])

    useEffect(() => {
        if (shopHistory?.length > 0) {
            const clone = shopHistory ? shopHistory.slice(0).reverse() : null
            const fechasLocales = clone?.map(fecha => new Date(fecha))

            setReversedHistory(fechasLocales)
        }
    }, [shopHistory])

    const handleShowHistory = () => {
        setShowHistory(!showHistory)
    }

    return { showHistory, reversedHistory, handleShowHistory }
}