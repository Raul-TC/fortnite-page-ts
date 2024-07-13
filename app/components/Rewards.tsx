import React from 'react'
import { Reward } from '../api/battlePass'
import BackgroundCard from './BackgroundCard'
import Link from 'next/link'

export const Rewards = React.memo(({ rewardsData }: { rewardsData: Reward[] }) => {
    return (
        rewardsData.map(pag => {
            return (
                <Link key={pag.offerId} className='relative w-full h-full rounded-md overflow-hidden' href={`/cosmetics/${pag.offerId}${pag.item.id}`}>
                    <img
                        src={pag.item.images.icon || pag.item.images.background}
                        alt={`image_${pag.item.name}`}
                        width={300}
                        height={300}
                        className='w-full h-full rounded-md relative top-0 left-0 bottom-0 right-0 z-10'
                    />
                    <img src={pag.bg} alt='' className='w-full h-full absolute top-0 bottom-0 left-0 right-0 z-0' />

                    <BackgroundCard displayName={pag.item.name} isFree={pag.battlepass} page='bp' />
                </Link>
            )
        })
    )
})
