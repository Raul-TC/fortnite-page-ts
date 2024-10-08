import '../assets/StyleBar.css'
import { luckiestGuy, balsamiqSans } from '../assets/fonts'
import useLocaleDateConvert from '../hooks/useLocaleDateConvert';
import { useMemo } from 'react';
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
import { BattlePass, CombinedStats } from '../api/stats';
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
interface Bar {
    key: string;
    color: string;
    data: number;
}
interface StatCardProps {
    stats?: SeasonStats | TrioStats | CombinedStats,
    mode?: string,
    battlePass?: BattlePass,
    isAll?: boolean
}

const StatCard = ({ stats, mode, isAll }: StatCardProps) => {
    const { solo, duo, trio, squad, wins, kills, placetop1, placetop3, top3, top5, top6, placetop6, top10, top12, top25, deaths, kd, matches, matchesplayed, minutesplayed, lastModified, minutesPlayed } = stats as SeasonStats & TrioStats & CombinedStats

    const allTimePlayed = solo?.minutesPlayed + duo?.minutesPlayed + trio?.minutesplayed + squad?.minutesPlayed
    const allWins = solo?.wins + duo?.wins + trio?.placetop1 + squad?.wins
    const allGames = solo?.matches + duo?.matches + trio?.matchesplayed + squad?.matches
    const allKD = solo?.kd + duo?.kd + trio?.kd + squad?.kd
    const allKills = solo?.kills + duo?.kills + trio?.kills + squad?.kills
    const { handleLocalDate } = useLocaleDateConvert()

    const commonClass = 'pl-3 text-gray-400 flex gap-1 items-center justify-center'
    const handleMinutes = useMemo(() => ({ time }: { time: number }) => {
        const minutos = time % 60
        const horas = Math.floor(time / 60) % 24
        const dias = Math.floor(time / 60 / 24)

        return dias === 0 ? `${horas} horas ${minutos} minutos` : `${dias} dias ${horas} horas ${minutos} minutos`
    }, [])
    const lastUpdate = lastModified ? handleLocalDate({ fecha: lastModified }) : 'Desconocido';
    const winCount = wins ?? placetop1;
    const matchCount = matches ? matches : matchesplayed;
    const winRate = Math.floor((winCount ?? allWins) / (matchCount ?? allGames) * 100) ?? 0;

    const winRatePercent = ((winCount ?? allWins) / (matchCount ?? allGames)) * 100;
    const topSolo = ((top10 + top25) / matchCount) * 100
    const allTopSolo = ((solo?.top10 + solo?.top25) / allGames) * 100
    const allTopDuo = ((duo?.top5 + duo?.top12) / allGames) * 100
    const allTopTrio = ((trio?.placetop3 + trio?.placetop6) / allGames) * 100
    const allTopSquad = ((squad?.top3 + squad?.top6) / allGames) * 100
    const topDuo = ((top5 + top12) / matchCount) * 100
    const topTrio = ((placetop3 + placetop6) / matchCount) * 100
    const topSquad = ((top3 + top6) / matchCount) * 100


    let bars: Bar[] = [];
    switch (mode) {
        case 'solo':
            bars = [
                { key: winRatePercent + 'winRate', color: 'bg-green-500', data: winRatePercent },
                { key: topSolo + 'solo', color: 'bg-blue-500', data: topSolo },
            ];
            break;
        case 'duo':
            bars = [
                { key: winRatePercent + 'winRate', color: 'bg-green-500', data: winRatePercent },
                { key: topDuo + 'duo', color: 'bg-orange-500', data: topDuo },
            ];
            break;
        case 'trio':
            bars = [
                { key: winRatePercent + 'winRate', color: 'bg-green-500', data: winRatePercent },
                { key: topTrio + 'trio', color: 'bg-purple-500', data: topTrio },
            ];
            break;
        case 'squad':
            bars = [
                { key: winRatePercent + 'winRate', color: 'bg-green-500', data: winRatePercent },
                { key: topSquad + 'squad', color: 'bg-yellow-500', data: topSquad },
            ];
            break;
        default:
            bars = []; // Manejo del caso por defecto si es necesario
            break;
    }

    // Agregar barras adicionales si isAll es verdadero
    if (isAll) {
        bars = [
            { key: 'winRate', color: 'bg-green-500', data: winRatePercent },
            { key: 'AllSolo', color: 'bg-blue-500', data: allTopSolo },
            { key: 'AllDuo', color: 'bg-orange-500', data: allTopDuo },
            { key: 'AllTrio', color: 'bg-purple-500', data: allTopTrio },
            { key: 'AllSquad', color: 'bg-yellow-500', data: allTopSquad }
        ];
    }

    const maxData = Math.max(...bars.map(bar => bar.data));

    // Ordenar las barras de menor a mayor data
    bars.sort((a, b) => b.data - a.data);
    const totalBars = bars.length; // Cambia este número si agregas o quitas barras
    const containerHeight = 50; // Altura total del contenedor en px
    const factor = 1.5; // Factor para que cada barra mida un poco más de la mitad de la barra anterior


    return (
        <div className={`${balsamiqSans.className} font-bold relative bg-bg-header text-base rounded-md w-full p-4`}>
            <div className='flex items-center border-b border-gray-500 w-full pb-4'>
                <h2 className={`${luckiestGuy.className} text-center text-3xl`}>{isAll ? 'Resumen Global' : `Resumen ${mode}`} </h2>
                <div>
                    <div className={commonClass}>
                        <img src={clock.src} alt="" />
                        <p><span className='text-white'>{handleMinutes({ time: (minutesPlayed ?? minutesplayed) || allTimePlayed })} Jugado</span></p>
                    </div>
                </div>

            </div>
            <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1  gap-4 flex-wrap w-full my-4'>

                <div className='bg-gray-800 flex flex-row items-center justify-center gap-2 py-2 px-4 rounded-md' >
                    <img src={percent.src} alt="" className='w-7 h-7' />
                    <div className='text-center'>
                        <p>% Victoria</p>
                        <h3 className='text-4xl'>{winRate}</h3>
                    </div>
                </div>
                <div className='bg-gray-800 flex flex-row items-center justify-center gap-2 py-2 px-4 rounded-md' >
                    <img src={winsImg.src} alt="" className='w-7 h-7' />
                    <div className='text-center'>
                        <p>Victorias</p>
                        <h3 className='text-4xl'>{winCount ?? allWins}</h3>
                    </div>
                </div>
                <div className='bg-gray-800 flex flex-row items-center justify-center gap-2 py-2 px-4 rounded-md' >
                    <img src={kdaImg.src} alt="" className='w-7 h-7' />

                    <div className='text-center'>
                        <p>K / D</p>
                        <h3 className='text-4xl'>{parseFloat(kd?.toFixed(2)) || parseFloat(allKD?.toFixed(2))}</h3>

                    </div>
                </div>
                <div className='bg-gray-800 flex flex-row items-center justify-center gap-2 py-2 px-4 rounded-md' >

                    <img src={killsImg.src} alt="" className='w-7 h-7' />

                    <div className='text-center'>
                        <p>Asesinatos</p>
                        <h3 className='text-4xl'>{kills ?? allKills}</h3>
                    </div>

                </div>
            </div>

            {isAll ? <div className='w-full'>
                <div className='flex gap-2 w-full items-center '>

                    <h4 className='text-lg '><span className='text-green-500'>Victorias</span> {allWins}</h4>
                    <h4 className='text-lg '><span className='text-blue-500'>Top 10/25</span> {solo?.top10 + solo?.top25}</h4>
                    <h4 className='text-lg '><span className='text-orange-500'>Top 5/12</span> {duo?.top5 + duo?.top12}</h4>
                    <h4 className='text-lg '><span className='text-purple-500'>Top 3/6 (Trio)</span> {trio?.placetop3 + trio?.placetop6}</h4>
                    <h4 className='text-lg '><span className='text-yellow-500'>Top 3/6 (Squad)</span> {squad.top3 + squad.top6}</h4>
                    <h4 className='text-lg ml-auto'><span className='text-gray-300'>Partidas</span> {matchCount ?? allGames}</h4>
                </div>
            </div> :

                <div className='w-full'>
                    <div className='flex gap-2 w-full items-center px-2'>

                        <h4 className='text-lg '><span className='text-green-500'>Victorias</span> {winCount}</h4>
                        {mode === 'solo' && <h4 className='text-lg '><span className='text-blue-500'>Top 10/25</span> {top10 + top25}</h4>}
                        {mode === 'duo' && <h4 className='text-lg '><span className='text-orange-500'>Top 5/12</span> {top5 + top12}</h4>}
                        {mode === 'trio' && <h4 className='text-lg '><span className='text-purple-500'>Top 3/6</span> {placetop3 + placetop6}</h4>}
                        {mode === 'squad' && <h4 className='text-lg '><span className='text-yellow-500'>Top 3/6</span> {top3 + top6}</h4>}
                        <h4 className='text-lg ml-auto'><span className='text-gray-300'>Partidas</span> {matchCount}</h4>
                    </div>
                </div>

            }
            <div className='w-full relative block bg-gray-300 rounded-full overflow-hidden progress-bar-container' style={{ height: `${containerHeight}px` }}>
                {bars.map((bar, index) => (
                    <AnimatedBar
                        key={bar.key}
                        color={bar.color}
                        data={bar.data}
                        height={containerHeight / Math.pow(factor, index)} // Altura proporcional: un poco más de la mitad   
                        zIndex={index * (containerHeight / totalBars)} // Posicionar cada barra sin espacios
                    />
                )
                )}  </div>

            {!isAll && <>
                <div className='flex justify-between my-4 flex-wrap gap-y-6 gap-x-4 px-4 py-2 w-full'>

                    <div className={commonClass}>
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
                    }
                    {
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
                        <p>K / D: <span className='text-white'>{parseFloat(kd?.toFixed(2))}</span></p>
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
                    </div>

                </div>
            </>}
        </div>
    )

}

export default StatCard