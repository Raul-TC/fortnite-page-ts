'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

interface Stats {
    user: string
    type: string
    isEmpty: boolean
}


const useSearch = () => {
    const [stats, setStats] = useState<Stats>({ user: '', type: '', isEmpty: false })
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const user = searchParams.get('name') || ''
    const accountType = searchParams.get('accountType') || ''
    useEffect(() => {
        if (user && accountType) {
            setStats({ user, type: accountType, isEmpty: false })
            // resetats()
        }
    }, [searchParams])

    const handleSubmit = ({ e }: { e: FormEvent<HTMLFormElement> }) => {
        e.preventDefault()

        const params = new URLSearchParams(searchParams.toString())
        console.log(params)

        if (stats.user.trim() === '' || stats.type.trim() === '') {
            setStats({ ...stats, isEmpty: true })
        } else {
            params.set('name', stats.user)
            params.set('accountType', stats.type)
            setStats({ ...stats, isEmpty: false })
            router.push(`${pathname}?${params.toString()}`,)
            router.refresh()
        }

    }

    const resetStats = () => {
        setStats({ user: '', type: '', isEmpty: false })
    }

    return { handleSubmit, stats, setStats }
}
export default useSearch