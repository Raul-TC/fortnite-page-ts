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
import { StatCardItem } from './StatCardItem';
import { StatsDashboard } from './StatsDashboard';
import { ModesDashboard } from './ModesDashboard';

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
    const generateBars = (mode: string | undefined): Bar[] => {
        const colors: { [key: string]: string } = {
            solo: 'bg-blue-500',
            duo: 'bg-orange-500',
            trio: 'bg-purple-500',
            squad: 'bg-yellow-500',
        };

        const data: { [key: string]: number } = {
            solo: topSolo,
            duo: topDuo,
            trio: topTrio,
            squad: topSquad,
        };

        return mode ? [
            { key: `${winRatePercent}winRate`, color: 'bg-green-500', data: winRatePercent },
            { key: `${mode}`, color: colors[mode ?? 'default'], data: data[mode ?? 'default'] },
        ] :
            [{ key: 'winRate', color: 'bg-green-500', data: winRatePercent },
            { key: 'AllSolo', color: 'bg-blue-500', data: allTopSolo },
            { key: 'AllDuo', color: 'bg-orange-500', data: allTopDuo },
            { key: 'AllTrio', color: 'bg-purple-500', data: allTopTrio },
            { key: 'AllSquad', color: 'bg-yellow-500', data: allTopSquad }]
            ;
    };

    bars = generateBars(mode)
    bars.sort((a, b) => b.data - a.data);
    const containerHeight = 50; // Altura total del contenedor en px
    const factor = 1.5; // Factor para que cada barra mida un poco más de la mitad de la barra anterior

    return (
        <div className={`${balsamiqSans.className} font-bold relative bg-bg-header text-base rounded-md w-full p-4`}>
            <div className='flex items-center border-b border-gray-500 w-full pb-4'>
                <h2 className={`${luckiestGuy.className} text-center text-3xl`}>{isAll ? 'Resumen Global' : `Resumen ${mode}`} </h2>
                <div>
                    <StatsDashboard icon={clock.src} text='Jugado:' stat={handleMinutes({ time: (minutesPlayed ?? minutesplayed) || allTimePlayed })} />
                </div>
            </div>

            {/* Global Dashboard */}
            <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1  gap-4 flex-wrap w-full my-4'>
                <StatCardItem icon={percent.src} label='% Victoria' value={winRate} />
                <StatCardItem icon={winsImg.src} label='Victorias' value={winCount ?? allWins} />
                <StatCardItem icon={kdaImg.src} label='K / D' value={parseFloat((kd ?? allKD).toFixed(2))} />
                <StatCardItem icon={killsImg.src} label='Asesinatos' value={kills ?? allKills} />
            </div>

            {/* Queue Modes */}
            {isAll ? <div className='w-full'>
                <div className='flex gap-2 w-full items-center '>
                    <ModesDashboard color='text-green-500' text='Victorias' value={allWins} />
                    <ModesDashboard color='text-blue-500' text='Top 10/25' value={solo?.top10 + solo?.top25} />
                    <ModesDashboard color='text-orange-500' text='Top 5/12' value={duo?.top5 + duo?.top12} />
                    <ModesDashboard color='text-purple-500' text='Top 3/6 (Trio)' value={trio?.placetop3 + trio?.placetop6} />
                    <ModesDashboard color='text-yellow-500' text='Top 3/6 (Squad)' value={squad.top3 + squad.top6} />
                    <ModesDashboard color='text-gray-500' text='Partidas' value={matchCount ?? allGames} />
                </div>
            </div> :

                <div className='w-full'>
                    <div className='flex gap-2 w-full items-center px-2'>
                        <h4 className='text-lg '><span className='text-green-500'>Victorias</span> {winCount}</h4>
                        {mode === 'solo' && <ModesDashboard color='text-blue-500' text='Top 10/25' value={top10 + top25} />}
                        {mode === 'duo' && <ModesDashboard color='text-orange-500' text='Top 5/12' value={top5 + top12} />}
                        {mode === 'trio' && <ModesDashboard color='text-purple-500' text='Top 3/6' value={placetop3 + placetop6} />}
                        {mode === 'trio' && <ModesDashboard color='text-yellow-500' text='Top 3/6' value={top3 + top6} />}
                        {mode === 'trio' && <ModesDashboard color='text-gray-500' text='Partidas' value={matchCount} />}
                    </div>
                </div>
            }

            {/* Bars  */}
            <div className='w-full relative block bg-gray-50 rounded-full overflow-hidden progress-bar-container' style={{ height: `${containerHeight}px` }}>
                {bars.map((bar, index) => (
                    <AnimatedBar
                        key={bar.key}
                        color={bar.color}
                        data={bar.data}
                        height={containerHeight / Math.pow(factor, index)}
                        zIndex={index * (containerHeight / bars.length)}
                    />
                )
                )}
            </div>


            {/* AllStats Cards */}
            {!isAll && <>
                <div className='flex justify-between my-4 flex-wrap gap-y-6 gap-x-4 px-4 py-2 w-full'>
                    <StatsDashboard icon={winsImg.src} text='Ganadas:' stat={winCount} />
                    <StatsDashboard icon={killsImg.src} text='Asesinatos:' stat={kills} />

                    {
                        mode === 'solo' && (
                            <>
                                <StatsDashboard icon={top10img.src} text='Top 10:' stat={top10} />
                                <StatsDashboard icon={top25img.src} text='Top 25:' stat={top25} />
                            </>
                        )
                    }
                    {
                        mode === 'duo' && (
                            <>
                                <StatsDashboard icon={top5img.src} text='Top 5:' stat={top5} />
                                <StatsDashboard icon={top12img.src} text='Top 12:' stat={top12} />
                            </>
                        )
                    }
                    {
                        mode === 'trio' && (
                            <>
                                <StatsDashboard icon={top3img.src} text='Top 3:' stat={placetop3} />
                                <StatsDashboard icon={top6img.src} text='Top 6:' stat={placetop6} />
                            </>
                        )
                    }
                    {
                        mode === 'squad' && (
                            <>
                                <StatsDashboard icon={top3img.src} text='Top 3:' stat={top3} />
                                <StatsDashboard icon={top6img.src} text='Top 6:' stat={top6} />
                            </>
                        )
                    }
                    {
                        mode !== 'trio' && (
                            <StatsDashboard icon={death.src} text='Muertes:' stat={deaths} />
                        )
                    }

                    <StatsDashboard icon={kdaImg.src} text='K / D:' stat={parseFloat(kd?.toFixed(2))} />
                    <StatsDashboard icon={games.src} text='Partidas:' stat={matchCount} />
                    <StatsDashboard icon={percent.src} text='% Victorias:' stat={winRate} />
                    <StatsDashboard icon={clock.src} text='Tiempo Jugado:' stat={handleMinutes({ time: minutesPlayed ?? minutesplayed })} />
                    <StatsDashboard icon={updateTime.src} text='Actualizado:' stat={lastUpdate} />

                </div>
            </>}
        </div>
    )

}

export default StatCard