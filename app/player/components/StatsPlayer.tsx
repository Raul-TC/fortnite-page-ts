'use client'
import { ModeStatsMenu } from '../../components/ModeStatsMenu'
import { Account, All, BattlePass, CombinedStats, CustomStats } from '../../api/stats'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SkeletonStats from '@/app/components/SkeletonStats'


interface PlayerStatsProps {
    // name: string | undefined,
    accountType: string | undefined,
    stats?: {
        allSeason: CombinedStats,
        season: All
    },
    battlePass?: BattlePass,
    account?: Account,
    // stack?: boolean,
    // isSearchValid: boolean
}

const StatsPlayer = ({ initialStats }: { initialStats: CustomStats }) => {
    const [playerStats, setPlayerStats] = useState<CustomStats>(initialStats)
    const [loading, setLoading] = useState(false)
    const params = useSearchParams()
    const name = params.get('name')
    const accountType = params.get('accountType')

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

                console.log({ response })
                if (!response.ok) {
                    throw new Error('Usuario no encontrado')
                }

                const respJson = await response.json()
                setPlayerStats(respJson)
            } catch (error) {
                console.log({ error })
            } finally {
                setLoading(false)
            }
        }
        // if (isSearchValid) {
        getPlayerStats(); // Llama a la función si los parámetros son válidos

    }, [params])

    // console.log({ stats })
    if (loading) {
        return <SkeletonStats />
    }
    // if (!playerStats) return



    return (
        <>
            {
                playerStats &&

                <div className='flex w-full mt-4 flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
                    {/* <Suspense fallback={<SkeletonStats />}> */}
                    <ModeStatsMenu stats={playerStats.stats} battlePass={playerStats.battlePass} account={playerStats.account?.name} />
                    {/* </Suspense> */}
                </div>
            }

        </>
    )
}

export default StatsPlayer