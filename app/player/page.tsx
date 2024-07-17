import React, { Suspense } from 'react'

import Search from '../components/Search'
import PlayerStats from '../components/StatsPlayer'
import SkeletonStats from '../components/SkeletonStats'
export const dynamic = 'force-dynamic'

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
const Player = async ({ searchParams }: PlayerProps) => {
    const { name, accountType } = searchParams
    return (
        <>
            <h1 className='text-center text-xl font-bold mt-[100px] md:text-4xl'>Buscar mis estadísticas 🎯</h1>
            <div className='flex justify-center items-center flex-wrap m-auto gap-2 text-center'>
                <Search />
            </div>
            {(name !== undefined && accountType !== undefined && name.trim() !== '') && (
                <Suspense key={`${name}+${accountType}`} fallback={<SkeletonStats />}>
                    <PlayerStats name={name} accountType={accountType} />
                </Suspense>
            )}
        </>
    )
}

export default Player