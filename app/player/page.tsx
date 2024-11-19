'use client'
import Search from '../components/Search'
import SkeletonStats from '../components/SkeletonStats'
import { useEffect, useState } from 'react'
import { CustomStats } from '../api/stats'
import StatsPlayer from './components/StatsPlayer'

// export const metadata = {
//     title: 'Estadísticas del Jugador',
//     description: 'Busca tus estadísticas de esta temporada y de forma global',
//     icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
//     facebook: {
//         card: '',
//         title: 'Mis Estadísticas',
//         description: 'Busca tus estadísticas de esta temporada y de forma global'
//     }
// }

interface PlayerProps {
    searchParams: {
        name: string,
        accountType: string
    }
}

export default function ({ searchParams }: PlayerProps) {
    // const { name, accountType } = searchParams

    // const isSearchValid = name && accountType && name.trim() !== '';
    const [stats, setStats] = useState<CustomStats>()
    const [loading, setLoading] = useState(false)
    // const getPlayerStats = async () => {

    //     if (!stats || !name || !accountType) return
    //     try {
    //         const resp = await getStats({ name, accountType })

    //         if (!resp.stats) {
    //             throw new Error('Usuario no encontrado')
    //         }

    //         console.log({ resp })
    //     } catch (error) {
    //         console.log({ error })
    //     }
    // }

    useEffect(() => {
        if (!searchParams) return;

        console.log('me ejecuto AL SEARCH')
        const { name, accountType } = searchParams

        console.log({ name, accountType })
        if (!name || !accountType) return
        const getPlayerStats = async () => {
            setLoading(true)
            if (name === '' || accountType === '') return
            try {
                const response = await fetch(`/api/player-stats/${name}/${accountType}`);

                if (!response.ok) {
                    throw new Error('Usuario no encontrado')
                }

                const respJson = await response.json()
                setStats(respJson)
            } catch (error) {
                console.log({ error })
            } finally {
                setLoading(false)
            }
        }
        // if (isSearchValid) {
        getPlayerStats(); // Llama a la función si los parámetros son válidos

    }, [searchParams])

    // console.log({ stats })
    if (loading) {
        return <SkeletonStats />
    }
    return (
        <>
            <h1 className='text-center text-xl font-bold md:text-4xl'>Buscar mis Estadísticas 🎯</h1>
            <div className='flex justify-center items-center flex-wrap m-auto gap-2 text-center'>
                <Search />
            </div>

            {stats ?
                <StatsPlayer stats={stats?.stats} accountType={stats?.account?.name} battlePass={stats?.battlePass} />

                :
                <h2 className='text-center mt-4 text-2xl md:text-3xl'>Ingresa tu TagName y Selecciona la plataforma</h2>}
        </>
    )
}

