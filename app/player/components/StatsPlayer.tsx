'use client'
import { ModeStatsMenu } from '../../components/ModeStatsMenu'
import { Account, All, BattlePass, CombinedStats } from '../../api/stats'


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

const StatsPlayer = ({ stats, accountType, account, battlePass }: PlayerStatsProps) => {

    console.log({ stats })
    console.log({ accountType })
    console.log({ account })
    console.log({ battlePass })
    return (
        <>

            <div className='flex w-full mt-4 flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
                {/* <Suspense fallback={<SkeletonStats />}> */}
                <ModeStatsMenu stats={stats} battlePass={battlePass} account={accountType} />
                {/* </Suspense> */}
            </div>

        </>
    )
}

export default StatsPlayer