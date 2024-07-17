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
    stats: SeasonStats | TrioStats,
    mode: string
}

const StatCard = ({ stats, mode }: StatCardProps) => {
    const { wins, kills, placetop1, placetop3, top3, top5, top6, placetop6, top10, top12, top25, deaths, kd, matches, matchesplayed, minutesplayed, lastModified, minutesPlayed } = stats as SeasonStats & TrioStats
    const { handleLocalDate } = useLocaleDateConvert()

    const commonClass = 'pl-3 text-gray-400 flex gap-1'

    const handleMinutes = useMemo(() => ({ time }: { time: number }) => {
        const minutos = time % 60
        const horas = Math.floor(time / 60) % 24
        const dias = Math.floor(time / 60 / 24)

        return dias === 0 ? `${horas} horas ${minutos} minutos` : `${dias} dias ${horas} horas ${minutos} minutos`
    }, [])

    const lastUpdate = lastModified ? handleLocalDate({ fecha: lastModified }) : 'Desconocido';
    const winCount = 'wins' in stats ? wins : placetop1;
    const matchCount = 'matches' in stats ? matches : matchesplayed;
    const winRate = winCount && matchCount ? Math.floor((winCount / matchCount) * 100) : 0;

    return (
        <div className={`${balsamiqSans.className} font-bold relative m-auto bg-bg-header text-base h-[342px] pt-4 rounded-md w-[98%] md:w-[432px]`}>
            <div className={commonClass}>
                {/* <FaCrown /> */}
                <img src={winsImg.src} alt="" />

                <p>Ganadas: <span className='text-white'>{winCount}</span></p>
            </div>
            <div className={commonClass}>
                {/* <GiPistolGun /> */}
                <img src={killsImg.src} alt="" />

                <p>Asesinatos: <span className='text-white'>{kills}</span></p>
            </div>
            {mode === 'solo' && (
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
            )}
            {mode === 'duo' && (
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
            )}
            {mode === 'trio' && (
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
            )}
            {mode === 'squad' && (
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
            )}
            {mode !== 'trio' && (
                <div className={commonClass}>
                    {/* <FaSkull /> */}
                    <img src={death.src} alt="" />
                    <p>Muertes: <span className='text-white'>{deaths}</span></p>
                </div>
            )}
            <div className={commonClass}>
                {/* <FaBalanceScaleLeft /> */}
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
                {/* <FaCalendarDays /> */}
                <p>Actualizado: <span className='text-white'> {lastUpdate}</span></p>
            </div>
            <div className={`${luckiestGuy.className} absolute bottom-0 left-0 right-0 w-full bg-yellowFortnite text-bg-header text-center text-[40px] h-11 flex items-center justify-center`}>
                <p>{mode}</p>
            </div>
        </div>
    )
}

export default StatCard