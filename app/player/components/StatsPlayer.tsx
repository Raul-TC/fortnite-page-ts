'use client'
import { ModeStatsMenu } from '../../components/ModeStatsMenu'
import { Account, All, BattlePass, CombinedStats, CustomStats } from '../../api/stats'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SkeletonStats from '@/app/components/SkeletonStats'


const StatsPlayer = ({ initialStats }: { initialStats: CustomStats }) => {
    const [playerStats, setPlayerStats] = useState<CustomStats>(initialStats)
    const [loading, setLoading] = useState(false)
    const params = useSearchParams()
    const name = params.get('name')
    const accountType = params.get('accountType')
    const [error, setError] = useState(false)
    useEffect(() => {
        // if (initialStats) return;

        console.log('me ejecuto AL SEARCH')

        // console.log({ name, accountType })
        if (!name || !accountType) return
        const getPlayerStats = async () => {
            setLoading(true)
            if (name === '' || accountType === '') return
            try {
                const response = await fetch(`/api/player-stats/${name}/${accountType}`);

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
        // if (isSearchValid) {
        getPlayerStats(); // Llama a la función si los parámetros son válidos

    }, [name, accountType])

    // console.log({ stats })
    if (loading) {
        console.log('cargando')
        return <SkeletonStats />
    }
    // if (!playerStats) return

    if (error) { error && <h2>Usuario {name} no encontrado, verifica tu username y tu plataforma</h2> }


    return (
        <>
            {


                <div className='flex w-full mt-4 flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
                    <Suspense fallback={<SkeletonStats />}>
                        <ModeStatsMenu stats={playerStats.stats} battlePass={playerStats.battlePass} account={playerStats.account?.name} />
                    </Suspense>
                </div>

            }

        </>
    )
}

export default StatsPlayer