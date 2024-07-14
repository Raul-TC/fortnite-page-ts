import React from 'react'
import { ArrData, Display, SeasonDates, Video } from '../api/battlePass'
import CurrentDay from './CurrentDay'
import CountDown from './CountDown'
import { Rewards } from './Rewards'
import { useRewards } from '../hooks/useRewards'

interface Props {
    currentPage: number
    arr: ArrData[],
    info: Display,
    videos: Video[],
    seasonDates: SeasonDates,
}

const BattlePass = React.memo(({ currentPage, arr, info, seasonDates, videos }: Props) => {

    const { page, data } = useRewards({ arr, currentPage });

    return (
        <>
            <h1 className='text-center font-bold text-2xl md:text-4xl'>{info.chapterSeason}</h1>
            <div className='flex flex-col self-start items-center justify-center w-full rounded-md top-0 left-0 right-0'>
                <CurrentDay date={seasonDates.begin} isShop={false} title='Inicio de Temporada' />
                <CurrentDay date={seasonDates.end} isShop={false} title='Fin de Temporada' />
                <CountDown isShop={false} date={seasonDates.end} />
            </div>
            <div className=' flex items-center justify-between w-full'>
                <video
                    className='relative left-0 right-0 top-0 bottom-0 h-full z-10 w-full'
                    src={videos[0].url}
                    controls
                />
            </div>
            <h2 className=' my-4 text-center text-xl font-bold md:text-3xl'>Recompensas del pase de batalla</h2>
            <section key={page} className='pb-4 w-full h-full m-auto'>
                <h2 className='text-2xl text-center font-bold mt-4 mb-4 md:text-2xl'> Página {page}</h2>
                <div className={`text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 ${data.length > 5 ? 'lg:grid-cols-6' : ''} gap-3 grid-flow-dense h-full m-auto justify-center items-center `}>
                    <Rewards rewardsData={data} />
                </div>
            </section>

        </>
    )
})

export default BattlePass