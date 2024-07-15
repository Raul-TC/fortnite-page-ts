import { useState } from 'react'


export function useShowHistory() {
    const [showHistory, setShowHistory] = useState<boolean>(false)

    const handleShowHistory = () => {
        console.log('me ejecuto')
        setShowHistory(!showHistory)
    }

    return { showHistory, handleShowHistory }
}