'use client'
import { useState } from 'react'

export function useToggle() {
    const [state, setState] = useState<boolean>(false)

    const handleToggle = () => setState(prevState => !prevState)

    return { state, handleToggle }
}