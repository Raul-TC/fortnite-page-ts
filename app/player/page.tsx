export const dynamic = 'force-dynamic'
import Search from '../components/Search'
import SkeletonStats from '../components/SkeletonStats'
import { Suspense, useEffect, useState } from 'react'
import { CustomStats } from '../api/stats'
import StatsPlayer from './components/StatsPlayer'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const metadata = {
    title: 'Estadísticas del Jugador',
    description: 'Busca tus estadísticas de esta temporada y de forma global',
    icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
    facebook: {
        card: '',
        title: 'Mis Estadísticas',
        description: 'Busca tus estadísticas de esta temporada y de forma global'
    }
}

interface PlayerProps {
    searchParams: {
        name: string,
        accountType: string
    }
}

export default async function ({ searchParams }: PlayerProps) {
    const { name, accountType } = searchParams
    let initialStats = null;

    console.log('hola')
    if (name && accountType) {
        try {
            // Fetch inicial solo si hay parámetros
            const responseStats = await fetch(`${process.env.FRONTEND_NEXT_PUBLIC}/api/player-stats/${name}/${accountType}`);

            if (!responseStats.ok) {
                throw new Error('Error fetching player stats');
            }
            initialStats = await responseStats.json()
        } catch (error) {
            console.error("Error fetching initial stats:", error);
        }
    }

    revalidatePath('/player')
    // const isSearchValid = name && accountType && name.trim() !== '';
    // const [stats, setStats] = useState<CustomStats>()
    // const [loading, setLoading] = useState(false)
    // const getPlayerStats = async () => {

    //     if (!stats || !name || !accountType) return
    //     try {
    //         const resp = await getStats({ name, accountType })
    // redirect('/player')

    //         if (!resp.stats) {
    //             throw new Error('Usuario no encontrado')
    //         }

    //         console.log({ resp })
    //     } catch (error) {
    //         console.log({ error })
    //     }
    // }

    // useEffect(() => {
    //     if (!searchParams) return;

    //     console.log('me ejecuto AL SEARCH')
    //     const { name, accountType } = searchParams

    //     console.log({ name, accountType })
    //     if (!name || !accountType) return
    //     const getPlayerStats = async () => {
    //         setLoading(true)
    //         if (name === '' || accountType === '') return
    //         try {
    //             const response = await fetch(`/api/player-stats/${name}/${accountType}`);

    //             if (!response.ok) {
    //                 throw new Error('Usuario no encontrado')
    //             }

    //             const respJson = await response.json()
    //             setStats(respJson)
    //         } catch (error) {
    //             console.log({ error })
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     // if (isSearchValid) {
    //     getPlayerStats(); // Llama a la función si los parámetros son válidos

    // }, [searchParams])

    // // console.log({ stats })
    // if (loading) {
    //     return <SkeletonStats />
    // }
    // console.log({ initialStats })
    return (
        <>
            <h1 className='text-center text-xl font-bold md:text-4xl'>Buscar mis Estadísticas 🎯</h1>
            <div className='flex justify-center items-center flex-wrap m-auto gap-2 text-center'>
                <Search />
                {initialStats ?

                    <Suspense fallback={<SkeletonStats />}>
                        <StatsPlayer initialStats={initialStats} />
                    </Suspense>
                    :
                    <h2 className='text-center mt-4 text-2xl md:text-3xl'>Ingresa tu TagName y Selecciona la plataforma</h2>
                }
            </div>



        </>
    )
}

