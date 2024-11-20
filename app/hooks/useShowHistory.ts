import { useState } from 'react'


export function useShowHistory() {
    const [showHistory, setShowHistory] = useState<boolean>(false)

    const handleShowHistory = () => {
        setShowHistory(!showHistory)
    }

    return { showHistory, handleShowHistory }
}