import { Suspense } from 'react'
import { luckiestGuy } from '../assets/fonts'
import { getStats } from '../services/fetchData'
import { ModeStatsMenu } from './ModeStatsMenu'
import SkeletonStats from './SkeletonStats'

interface PlayerStatsProps {
    name: string,
    accountType: string
}
export const dynamic = 'force-dynamic'

const PlayerStats = async ({ name, accountType }: PlayerStatsProps) => {
    const { stats, account, battlePass, stack, } = await getStats({ name, accountType })


    if (stack) {
        return <div className='text-2xl text-center my-4'>
            <h2>Usuario: <span className='font-bold text-yellowFortnite'>{name}</span> no encontrado. 🥲🥲</h2>
            <span>Verifica el nombre y/o la plataforma seleccionda</span>
        </div>
    }


    return (
        <>
            <div className='mt-4'>
                <div className='mt-2 mb-4'>
                    <h2 className={`${luckiestGuy.className} text-center text-3xl`}>{account?.name} </h2>
                    <h2 className={`${luckiestGuy.className} text-center text-2xl`}>Temporada Actual: Nivel {battlePass?.level}</h2>
                </div>
                <div className='flex w-full flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
                    <Suspense fallback={<SkeletonStats />}>
                        <ModeStatsMenu stats={stats} />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default PlayerStats