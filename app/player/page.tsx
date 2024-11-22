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
    let error = ''
    if (name && accountType) {
        try {
            // Fetch inicial solo si hay parámetros
            const responseStats = await fetch(`${process.env.FRONTEND_NEXT_PUBLIC}/api/player-stats/${name}/${accountType}`, { cache: 'no-store' });

            if (!responseStats.ok) {
                error = `Username ${name} no encontrado :(`
                throw new Error('Error fetching player stats');
            }
            initialStats = await responseStats.json()
        } catch (error) {
            console.error("Error fetching initial stats:", error);
        }
    }

    return (
        <>
            <h1 className='text-center text-xl font-bold md:text-4xl'>Buscar mis Estadísticas 🎯</h1>
            <div className='flex justify-center items-center flex-wrap m-auto gap-2 text-center'>
                <Suspense key={crypto.randomUUID()} fallback={<SkeletonStats />}>
                    <Search />
                </Suspense>
                {/* {error && <h2>{error}</h2>} */}
                {initialStats ?

                    // <Suspense key={crypto.randomUUID()} fallback={<SkeletonStats />}>
                    <StatsPlayer initialStats={initialStats} name={name} account={accountType} />
                    // </Suspense>
                    :
                    <h2 className='text-center mt-4 text-2xl md:text-3xl'>{error || 'Ingresa tu TagName y Selecciona la plataforma'}</h2>
                }
            </div>



        </>
    )
}

