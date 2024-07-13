'use client'
import { useCallback, useState } from 'react'

export const useExpandItem = () => {
    const [expandedItem, setExpandedItem] = useState<boolean | number>(false)

    const handleExpandItem = useCallback(({ index }: { index: boolean | number }) => {
        setExpandedItem(expandedItem === index ? false : index)
    }, [expandedItem])

    return { expandedItem, handleExpandItem }
}