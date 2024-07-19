export const dynamic = 'force-dynamic'
import React, { Suspense } from 'react'

import Search from '../components/Search'
import PlayerStats from '../components/StatsPlayer'
import SkeletonStats from '../components/SkeletonStats'
import { getStats } from '../services/fetchData'

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
    // const { stats, account, battlePass, stack } = await getStats({ name, accountType })


    const isSearchValid = name && accountType && name.trim() !== '';
    // if (stack) {
    //     return <div className='text-2xl text-center my-4'>
    //         <h2>Usuario: <span className='font-bold text-yellowFortnite'>{name}</span> no encontrado. 🥲🥲</h2>
    //         <span>Verifica el nombre y/o la plataforma seleccionda</span>
    //     </div>
    // }

    return (
        <>
            <h1 className='text-center text-xl font-bold mt-[100px] md:text-4xl'>Buscar mis Estadísticas 🎯</h1>
            <div className='flex justify-center items-center flex-wrap m-auto gap-2 text-center'>
                <Search />
            </div>

            {isSearchValid ? (
                <Suspense key={`${name}+${accountType}+${crypto.randomUUID()}`} fallback={<SkeletonStats />}>
                    <PlayerStats isSearchValid={isSearchValid} name={name} accountType={accountType} />
                </Suspense>
            ) : <h2 className='text-center mt-4 text-3xl'>Ingresa tu TagName y Selecciona la plataforma</h2>}
        </>
    )
}

export default Player