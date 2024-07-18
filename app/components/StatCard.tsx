import '../assets/StyleBar.css'
import { luckiestGuy, balsamiqSans } from '../assets/fonts'
import useLocaleDateConvert from '../hooks/useLocaleDateConvert';
import { useEffect, useMemo } from 'react';
import clock from '../assets/clock.svg'
import top10img from '../assets/top10.svg'
import top25img from '../assets/top25.svg'
import top6img from '../assets/top6.svg'
import top5img from '../assets/top5.svg'
import top12img from '../assets/top12.svg'
import top3img from '../assets/top3.svg'
import percent from '../assets/percentageWins.svg'
import games from '../assets/games.svg'
import winsImg from '../assets/wins.svg'
import killsImg from '../assets/kills.svg'
import death from '../assets/death.svg'
import kdaImg from '../assets/kda.svg'
import updateTime from '../assets/updateTime.svg'
import star from '../assets/star.svg'
import { BattlePass } from '../api/stats';
import { AnimatedBar } from './AnimatedBar';

interface SeasonStats {
    score: number,
    scorePerMin: number,
    scorePerMatch: number,
    wins: number,
    top3: number,
    top5: number,
    top6: number,
    top10: number,
    top12: number,
    top25: number,
    kills: number,
    killsPerMin: number,
    killsPerMatch: number,
    deaths: number,
    kd: number,
    matches: number,
    winRate: number,
    minutesPlayed: number,
    playersOutlived: number,
    lastModified: string
}

interface TrioStats {
    placetop1: number,
    kills: number,
    placetop3: number,
    placetop6: number,
    deaths: number,
    kd: number,
    matchesplayed: number,
    winrate: number,
    minutesplayed: number
}

interface StatCardProps {
    stats?: SeasonStats | TrioStats,
    mode: string,
    battlePass?: BattlePass
}

const StatCard = ({ stats, mode, battlePass }: StatCardProps) => {
    const { wins, kills, placetop1, placetop3, top3, top5, top6, placetop6, top10, top12, top25, deaths, kd, matches, matchesplayed, minutesplayed, lastModified, minutesPlayed } = stats as SeasonStats & TrioStats
    console.log(wins)
    console.log(placetop1)
    const { handleLocalDate } = useLocaleDateConvert()

    const commonClass = 'pl-3 text-gray-400 flex gap-1'

    const handleMinutes = useMemo(() => ({ time }: { time: number }) => {
        const minutos = time % 60
        const horas = Math.floor(time / 60) % 24
        const dias = Math.floor(time / 60 / 24)

        return dias === 0 ? `${horas} horas ${minutos} minutos` : `${dias} dias ${horas} horas ${minutos} minutos`
    }, [])
    const lastUpdate = lastModified ? handleLocalDate({ fecha: lastModified }) : 'Desconocido';
    const winCount = wins ?? placetop1;
    const matchCount = matches ? matches : matchesplayed;
    const winRate = Math.floor((winCount / matchCount) * 100) ?? 0;

    const winRatePercent = (winCount / matchCount) * 100;
    const kdRatPercent = (kd / matchCount);
    const killRatePercent = (kills / matchCount);
    const topSolo = ((top10 + top25) / matchCount) * 100
    const topDuo = ((top5 + top12) / matchCount) * 100
    const topTrio = ((placetop3 + placetop6) / matchCount) * 100
    const topSquad = ((top3 + top6) / matchCount) * 100
    // const deathsPercent = (deaths / matchCount) * 100
    // const topRatePercent = (tops / totalMatches) * 100;
    // useEffect(() => {
    //     const bars = document.querySelectorAll('.progress-bar') as NodeListOf<HTMLElement>;
    //     console.log(bars)
    //     bars.forEach((bar) => {
    //         const width = bar.getAttribute('data-progress');
    //         if (width) {
    //             bar.style.setProperty('--progress-width', `${width}`);
    //         }
    //     });
    // }, [winRatePercent, topSolo, topDuo]);

    return (
        <div className={`${balsamiqSans.className} font-bold relative m-auto bg-bg-header text-base rounded-md w-[98%]`}>
            <div className='flex items-center px-4 border-b border-gray-500 w-full py-4'>
                <h2 className={`${luckiestGuy.className} text-center text-3xl`}>Resumen </h2>
                <div>
                    <div className={commonClass}>
                        <img src={clock.src} alt="" />
                        <p><span className='text-white'>{handleMinutes({ time: minutesPlayed ?? minutesplayed })} Jugado</span></p>
                    </div>
                </div>
                <div className={commonClass}>
                    <img src={star.src} alt="" />
                    <p><span className='text-white'>{battlePass?.level} Nivel Pase de Batalla</span></p>
                </div>
                {/* %Win Wins KD Kills */}
            </div>
            <div className='flex justify-between items-center gap-4 flex-wrap w-full px-4 my-4'>

                <div className='bg-gray-800 flex flex-row items-center gap-2 py-2 px-4 rounded-md' >
                    <img src={percent.src} alt="" className='w-7 h-7' />
                    <div>
                        <p>% Victoria</p>
                        <h3 className='text-4xl'>{winRate}</h3>
                    </div>
                </div>
                {/* <div className='w-full bg-gray-300 rounded-full h-4 overflow-hidden'>
                    <div className='bg-yellow-500 h-full rounded-full' style={{ width: `${winRate}%` }}></div>
                </div> */}
                <div className='bg-gray-800 flex flex-row items-center gap-2 py-2 px-4 rounded-md' >
                    <img src={winsImg.src} alt="" className='w-7 h-7' />
                    <div>
                        <p>Victorias</p>
                        <h3 className='text-4xl'>{winCount}</h3>
                    </div>
                </div>
                <div className='bg-gray-800 flex flex-row items-center gap-2 py-2 px-4 rounded-md' >
                    <img src={kdaImg.src} alt="" className='w-7 h-7' />

                    <div>
                        <p>K / D</p>
                        <h3 className='text-4xl'>{kd}</h3>

                    </div>
                </div>
                <div className='bg-gray-800 flex flex-row items-center gap-2 py-2 px-4 rounded-md' >

                    <img src={killsImg.src} alt="" className='w-7 h-7' />

                    <div>
                        <p>Asesinatos</p>
                        <h3 className='text-4xl'>{kills}</h3>
                    </div>

                </div>
            </div>

            {/* <div className='w-full flex flex-col h-4'>
                <div className='bg-green-500 h-full rounded-full' style={{ width: `${winRatePercent}%` }}></div>
                <div className='bg-red-500 h-full rounded-full' style={{ width: `${kdRatPercent}%` }}></div>
                <div className='bg-blue-500 h-full rounded-full' style={{ width: `${killRatePercent}%` }}></div>
                <div className='bg-gray-500 h-full rounded-full' style={{ width: `${matchCount}%` }}></div>


            </div> */}
            <div className='w-full'>
                <div className='flex gap-2 w-full items-center px-2'>

                    <h4 className='text-lg '><span className='text-green-500'>Victorias</span> {winCount}</h4>
                    {/* {mode !== 'trio' && <h4 className='text-lg '><span className='text-red-500'>%Victoria</span> {deaths}</h4>} */}
                    {mode === 'solo' && <h4 className='text-lg '><span className='text-blue-500'>Top 10/25</span> {top10 + top25}</h4>}
                    {mode === 'duo' && <h4 className='text-lg '><span className='text-orange-500'>Top 5/12</span> {top5 + top12}</h4>}
                    {mode === 'trio' && <h4 className='text-lg '><span className='text-purple-500'>Top 3/6</span> {placetop3 + placetop6}</h4>}
                    {mode === 'squad' && <h4 className='text-lg '><span className='text-yellow-500'>Top 3/6</span> {top3 + top6}</h4>}
                    <h4 className='text-lg ml-auto'><span className='text-gray-300'>Partidas</span> {matchCount}</h4>
                </div>
                {/* <h4 className='text-lg '><span className='text-purple-500'>Victorias</span> {winCount}</h4> */}
                {/* <div className='w-full bg-gray-300 rounded-full h-4 overflow-hidden'>
                    <div className='bg-green-500 h-full rounded-full' style={{ width: `${winRatePercent}%` }}></div>
                </div> */}
            </div>

            <div className='w-full'>
                <div className='w-full relative bg-gray-300 rounded-full h-8 overflow-hidden progress-bar-container'>
                    <AnimatedBar key={winRatePercent + 'winRate'} color='green' height='6' index='30' data={winRatePercent} />
                    {/* <div className='bg-green-500 h-6 rounded-full absolute z-30 progress-bar-animated progress-bar' data-progress={`${winRatePercent}%`}></div> */}
                    {/* {mode !== 'trio' && <AnimatedBar color='red' height='4' index='0' data={deathsPercent} />} */}
                    {mode === 'solo' && <AnimatedBar key={topSolo + 'solo'} color='blue' height='8' index='20' data={topSolo} />}
                    {mode === 'duo' && <AnimatedBar key={topDuo + 'duo'} color='orange' height='8' index='10' data={topDuo} />}
                    {mode === 'trio' && <AnimatedBar key={topTrio + 'trio'} color='purple' height='8' index='10' data={topTrio} />}
                    {mode === 'squad' && <AnimatedBar key={topSquad + 'squad'} color='yellow' height='8' index='10' data={topSquad} />}
                    {/* {mode === 'duo' && <AnimatedBar color='blue' height='8' index='10' data={topDuo} />} */}
                    {/* {mode === 'duo' && <div className='bg-blue-500 h-8 rounded-full absolute z-20 progress-bar-animated progress-bar' data-progress={`${topDuo}%`}></div>} */}
                    {/* <div className='bg-gray-700 h-10 rounded-full absolute z-10' style={{ '--progress-width': `${matchCount}%` }}></div> */}
                </div>
            </div>

            {/* <div className='w-full'>
                <h4 className='text-lg'>Porcentaje de Asesinatos</h4>
                <div className='w-full bg-gray-300 rounded-full h-4 overflow-hidden'>
                    <div className='bg-red-500 h-full rounded-full' style={{ width: `${killRatePercent}%` }}></div>
                </div>
            </div> */}

            {/* <div className='w-full'>
                <h4 className='text-lg'>Partidas</h4>
                <div className='w-full bg-gray-300 rounded-full h-4 overflow-hidden'>
                    <div className='bg-purple-500 h-full rounded-full' style={{ width: `${matchCount}%` }}></div>
                </div>
            </div> */}

            {/* <div className={commonClass}>
                <img src={winsImg.src} alt="" />

                <p>Ganadas: <span className='text-white'>{winCount}</span></p>
            </div>
            <div className={commonClass}>
                <img src={killsImg.src} alt="" />

                <p>Asesinatos: <span className='text-white'>{kills}</span></p>
            </div>
            {
                mode === 'solo' && (
                    <>
                        <div className={commonClass}>
                            <img src={top10img.src} alt="" />
                            <p>Top 10:<span className='text-white'> {top10}</span></p>
                        </div>
                        <div className={commonClass}>
                            <img src={top25img.src} alt="" />
                            <p>Top 25: <span className='text-white'>{top25}</span></p>
                        </div>
                    </>
                )
            } */}
            {/* {
                mode === 'duo' && (
                    <>
                        <div className={commonClass}>
                            <img src={top5img.src} alt="" />
                            <p>Top 5: <span className='text-white'>{top5}</span></p>
                        </div>
                        <div className={commonClass}>
                            <img src={top12img.src} alt="" />
                            <p>Top 12: <span className='text-white'>{top12}</span></p>
                        </div>
                    </>
                )
            }
            {
                mode === 'trio' && (
                    <>
                        <div className={commonClass}>
                            <img src={top3img.src} alt="" />
                            <p>Top 3: <span className='text-white'>{placetop3}</span></p>
                        </div>
                        <div className={commonClass}>
                            <img src={top6img.src} alt="" />
                            <p>Top 6: <span className='text-white'>{placetop6}</span></p>
                        </div>
                    </>
                )
            }
            {
                mode === 'squad' && (
                    <>
                        <div className={commonClass}>
                            <img src={top3img.src} alt="" />
                            <p>Top 3: <span className='text-white'>{top3}</span></p>
                        </div>
                        <div className={commonClass}>
                            <img src={top6img.src} alt="" />
                            <p>Top 6: <span className='text-white'>{top6}</span></p>
                        </div>
                    </>
                )
            }
            {
                mode !== 'trio' && (
                    <div className={commonClass}>
                        <img src={death.src} alt="" />
                        <p>Muertes: <span className='text-white'>{deaths}</span></p>
                    </div>
                )
            }
            <div className={commonClass}>
                <img src={kdaImg.src} alt="" />
                <p>K / D: <span className='text-white'>{kd}</span></p>
            </div>
            <div className={commonClass}>
                <img src={games.src} alt="" />
                <p>Partidas: <span className='text-white'>{matchCount}</span></p>
            </div>
            <div className={commonClass}>
                <img src={percent.src} alt="" />
                <p>% Victorias: <span className='text-white'>{winRate}%</span></p>
            </div>
            <div className={commonClass}>
                <img src={clock.src} alt="" />
                <p>Tiempo Jugado: <span className='text-white'>{handleMinutes({ time: minutesPlayed ?? minutesplayed })}</span></p>
            </div>
            <div className={commonClass}>
                <img src={updateTime.src} alt="" />
                <p>Actualizado: <span className='text-white'> {lastUpdate}</span></p>
            </div> */}

        </div>
    )

}

export default StatCard