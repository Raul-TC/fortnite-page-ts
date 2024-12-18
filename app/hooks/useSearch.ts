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

    useEffect(() => {
        const user = searchParams.get('name') || ''
        const accountType = searchParams.get('accountType') || ''

        if (user && accountType) {
            setStats({ user, type: accountType, isEmpty: false })
            // resetats()
        }
    }, [searchParams])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (stats.user.trim() === '' || stats.type.trim() === '') {
            setStats({ ...stats, isEmpty: true })
            return
        }

        const params = new URLSearchParams(searchParams.toString())

        params.set('name', stats.user)
        params.set('accountType', stats.type)
        router.replace(`${pathname}?${params.toString()}`)

        // router.refresh()


    }

    // const resetStats = () => {
    //     setStats({ user: '', type: '', isEmpty: false })
    // }

    return { handleSubmit, stats, setStats }
}
export default useSearch