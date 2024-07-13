'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

interface Stats {
    user: string
    type: string
    isEmpty: boolean
}


const useSearch = () => {
    const { replace } = useRouter()
    const [stats, setStats] = useState<Stats>({ user: '', type: '', isEmpty: false })
    const searchParams = useSearchParams()

    const pathname = usePathname()

    const user = searchParams.get('name') || ''
    const accountType = searchParams.get('accountType') || ''
    useEffect(() => {
        if (user && accountType) {
            setStats({ user, type: accountType, isEmpty: false })
            resetStats()
        }
    }, [searchParams])

    const handleSubmit = ({ e }: { e: FormEvent<HTMLFormElement> }) => {
        e.preventDefault()

        console.log(stats)
        const params = new URLSearchParams()

        if (stats.user.trim() === '' || stats.type.trim() === '') {
            setStats({ ...stats, isEmpty: true })
        } else {
            params.set('name', stats.user)
            params.set('accountType', stats.type)
            setStats({ ...stats, isEmpty: false })
            replace(`${pathname}?${params.toString()}`)
        }
        // resetStats()

    }

    const resetStats = () => {
        setStats({ user: '', type: '', isEmpty: false })
    }

    return { handleSubmit, stats, setStats }
}
export default useSearch