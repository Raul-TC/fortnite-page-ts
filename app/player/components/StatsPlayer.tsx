'use client'
import { ModeStatsMenu } from '../../components/ModeStatsMenu'
import { CustomStats } from '../../api/stats'
import { Suspense, useEffect, useState } from 'react'
import SkeletonStats from '@/app/components/SkeletonStats'


const StatsPlayer = ({ initialStats, name, account }: { initialStats: CustomStats, name: string, account: string }) => {
    const [playerStats, setPlayerStats] = useState<CustomStats>(initialStats || null)
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)
    useEffect(() => {
        if (!name || !account) return
        const getPlayerStats = async () => {

            if (name === '' || account === '') return
            try {
                setLoading(true)
                // setError(null) // Reinicia el error
                const response = await fetch(`/api/player-stats/${name}/${account}`);

                if (!response.ok) {
                    throw new Error('Usuario no encontrado')
                }

                setError(false)
                const respJson = await response.json()
                setPlayerStats(respJson)
            } catch (error) {
                console.log({ error })
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        getPlayerStats(); // Llama a la función si los parámetros son válidos

    }, [name, account])

    if (loading) {
        console.log('cargando')
        return <SkeletonStats />
    }
    // if (!playerStats) return

    console.log({ error })
    if (error) {
        return <h2>Usuario {name} no encontrado, verifica tu username y tu plataforma</h2>
    }

    return (
        <>
            {


                <div className='flex w-full mt-4 flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
                    <Suspense key={`${name}-${account}`} fallback={<SkeletonStats />}>
                        <ModeStatsMenu stats={playerStats.stats} battlePass={playerStats.battlePass} account={playerStats.account?.name} />
                    </Suspense>
                </div>

            }

        </>
    )
}

export default StatsPlayer