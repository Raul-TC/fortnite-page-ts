import StatCard from './StatCard'
import { luckiestGuy } from '../assets/fonts'
import { getStats } from '../services/fetchData'

interface PlayerStatsProps {
    name: string,
    accountType: string
}
const PlayerStats = async ({ name, accountType }: PlayerStatsProps) => {
    const { stats, account, battlePass, stack, status, } = await getStats({ name, accountType })

    if (stack) {
        return <div className='text-2xl text-center my-4'>
            <h2>Usuario: <span className='font-bold text-yellowForrnite'>{name}</span> no encontrado. 🥲🥲</h2>
            <span>Verifica el nombre y/o la plataforma seleccionda</span>
        </div>
    }

    const handleMinutes = ({ time }: { time: number }) => {
        const minutos = time % 60
        const horas = Math.floor(time / 60) % 24
        const dias = Math.floor(time / 60 / 24)

        return dias === 0 ? `${horas} horas ${minutos} minutos` : `${dias} dias ${horas} horas ${minutos} minutos`
    }

    const handleLocalDate = ({ fecha }: { fecha: string }) => {
        const date = new Date(fecha)
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'America/Monterrey'
        }

        return date.toLocaleString('es-MX', options)
    }

    return (
        <div className='mt-4'>
            <div className='mt-2 mb-4'>
                <h2 className={`${luckiestGuy.className} text-center text-3xl`}>{account?.name} </h2>
                <h2 className={`${luckiestGuy.className} text-center text-2xl`}>Temporada Actual: Nivel {battlePass?.level}</h2>
            </div>
            <div className='flex w-full flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
                {stats?.season &&
                    <>
                        <StatCard
                            wins={stats.season.solo?.wins}
                            kills={stats.season.solo?.kills}
                            topN={stats.season.solo?.top10}
                            topNN={stats.season.solo?.top25}
                            deaths={stats.season.solo?.deaths}
                            kda={stats.season.solo?.kd}
                            matches={stats.season.solo?.matches}
                            timePlayed={handleMinutes({ time: stats.season.solo?.minutesPlayed })}
                            updated={handleLocalDate({ fecha: stats.season.solo?.lastModified })}
                            modo='Solo'
                        />
                        <StatCard
                            wins={stats.season.duo?.wins}
                            kills={stats.season.duo.kills}
                            topN={stats.season.duo.top5}
                            topNN={stats.season.duo.top12}
                            deaths={stats.season.duo.deaths}
                            kda={stats.season.duo.kd}
                            matches={stats.season.duo.matches}
                            timePlayed={handleMinutes({ time: stats.season.duo.minutesPlayed })}
                            updated={handleLocalDate({ fecha: stats.season.duo.lastModified })}
                            modo='Duo'
                        />
                        <StatCard
                            wins={stats.season.squad?.wins ?? 0}
                            kills={stats.season.squad?.kills}
                            topN={stats.season.squad?.top3}
                            topNN={stats.season.squad?.top6}
                            deaths={stats.season.squad?.deaths}
                            kda={stats.season.squad?.kd}
                            matches={stats.season.squad?.matches}
                            timePlayed={handleMinutes({ time: stats.season.squad?.minutesPlayed })}
                            updated={handleLocalDate({ fecha: stats.season.squad?.lastModified })}
                            modo='Squad'
                        />
                    </>
                }
            </div>
            <h2 className={`${luckiestGuy.className} text-center text-5xl my-4`}>Todas las Temporadas</h2>
            <div className='flex w-full flex-col md:flex-row items-center justify-center flex-wrap gap-4'>
                {stats?.lifetime && <>
                    <StatCard
                        wins={stats.lifetime.solo.wins}
                        kills={stats.lifetime.solo.kills}
                        topN={stats.lifetime.solo.top10}
                        topNN={stats.lifetime.solo.top25}
                        deaths={stats.lifetime.solo.deaths}
                        kda={stats.lifetime.solo.kd}
                        matches={stats.lifetime.solo.matches}
                        timePlayed={handleMinutes({ time: stats.lifetime.solo.minutesPlayed })}
                        updated={handleLocalDate({ fecha: stats.lifetime.solo.lastModified })}
                        modo='Solo'
                    />

                    <StatCard
                        wins={stats.lifetime.duo.wins}
                        kills={stats.lifetime.duo.kills}
                        topN={stats.lifetime.duo.top5}
                        topNN={stats.lifetime.duo.top12}
                        deaths={stats.lifetime.duo.deaths}
                        kda={stats.lifetime.duo.kd}
                        matches={stats.lifetime.duo.matches}
                        timePlayed={handleMinutes({ time: stats.lifetime.duo.minutesPlayed })}
                        updated={handleLocalDate({ fecha: stats.lifetime.duo.lastModified })}
                        modo='Duo'
                    />
                    <StatCard
                        wins={stats.lifetime.trio?.placetop1}
                        kills={stats.lifetime.trio?.kills}
                        topN={stats.lifetime.trio?.placetop3}
                        topNN={stats.lifetime.trio?.placetop6}
                        deaths={0}
                        kda={stats.lifetime.trio?.kd}
                        matches={stats.lifetime.trio?.matchesplayed}
                        timePlayed={handleMinutes({ time: stats.lifetime.trio.minutesplayed })}
                        updated='Desconocido'
                        modo='Trio'
                    />
                    {stats.lifetime.squad &&
                        <StatCard
                            wins={stats.lifetime.squad?.wins ?? 0}
                            kills={stats.lifetime.squad?.kills}
                            topN={stats.lifetime.squad?.top3}
                            topNN={stats.lifetime.squad?.top6}
                            deaths={stats.lifetime.squad?.deaths}
                            kda={stats.lifetime.squad?.kd}
                            matches={stats.lifetime.squad?.matches}
                            timePlayed={handleMinutes({ time: stats.lifetime.squad?.minutesPlayed })}
                            updated={handleLocalDate({ fecha: stats.lifetime.squad?.lastModified })}
                            modo='Squad'
                        />}
                </>}
            </div>
        </div>
    )
}

export default PlayerStats