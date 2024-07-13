import { useEffect, useState } from 'react'

export function useShowHistory(shopHistory) {
    const [showHistory, setShowHistory] = useState(false)
    const [reversedHistory, setReversedHistory] = useState([])

    useEffect(() => {
        if (shopHistory?.length > 0) {
            const clone = shopHistory ? shopHistory.slice(0).reverse() : null
            const fechasLocales = clone.map(fecha => new Date(fecha))

            setReversedHistory(fechasLocales)
        }
    }, [shopHistory])

    const handleShowHistory = () => {
        setShowHistory(!showHistory)
    }

    return { showHistory, reversedHistory, handleShowHistory }
}