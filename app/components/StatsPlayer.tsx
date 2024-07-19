import { Suspense } from 'react'
import { luckiestGuy } from '../assets/fonts'
import { getStats } from '../services/fetchData'
import { ModeStatsMenu } from './ModeStatsMenu'
import SkeletonStats from './SkeletonStats'
import { Account, All, BattlePass, CombinedStats } from '../api/stats'

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
export const dynamic = 'force-dynamic'

const PlayerStats = async ({ name, accountType, isSearchValid }: PlayerStatsProps) => {
    const { stats, account, battlePass, stack, } = await getStats({ name, accountType })

    if (stack) {
        return <div className='text-2xl text-center my-4'>
            <h2>Usuario: <span className='font-bold text-yellowFortnite'>{name}</span> no encontrado. 🥲🥲</h2>
            <span>Verifica el nombre y/o la plataforma seleccionda</span>
        </div>
    }

    console.log(name)
    console.log(accountType)
    return (
        <>
            {isSearchValid &&
                <div className='flex w-full mt-4 flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
                    <Suspense fallback={<SkeletonStats />}>
                        <ModeStatsMenu stats={stats} battlePass={battlePass} account={account} />
                    </Suspense>
                </div>
            }
        </>
    )
}

export default PlayerStats