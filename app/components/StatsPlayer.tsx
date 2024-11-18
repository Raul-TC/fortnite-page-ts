export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { getStats } from '../services/fetchData'
import { ModeStatsMenu } from './ModeStatsMenu'
import SkeletonStats from './SkeletonStats'
import { Account, All, BattlePass, CombinedStats } from '../api/stats'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

interface PlayerStatsProps {
    name: string,
    accountType: string,
    stats?: {
        allSeason: CombinedStats,
        season: All
    },
    battlePass?: BattlePass,
    account?: Account,
    stack?: boolean,
    isSearchValid: boolean
}

const PlayerStats = async ({ name, accountType, isSearchValid }: PlayerStatsProps) => {
    const { stats, account, battlePass, stack } = await getStats({ name, accountType })

    console.log({ stats, account, battlePass, stack })
    console.log({ stack })
    //¿ if (stack) {
    //     redirect('/player')
    // }
    revalidatePath('/player')
    if (!stats || !account) {
        return <div className='text-2xl text-center my-4'>
            <h2>Usuario: <span className='font-bold text-yellowFortnite'>{name}</span> no encontrado. 🥲🥲</h2>
            <span>Verifica el nombre y/o la plataforma seleccionda</span>
        </div>
    }

    return (
        <>

            <div className='flex w-full mt-4 flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
                <Suspense fallback={<SkeletonStats />}>
                    <ModeStatsMenu stats={stats} battlePass={battlePass} account={account} />
                </Suspense>
            </div>

        </>
    )
}

export default PlayerStats