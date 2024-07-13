import { luckiestGuy, balsamiqSans } from '../assets/fonts'

interface StatCardProps {
    wins: number,
    kills: number,
    topN: number,
    topNN: number,
    deaths: number,
    kda: number,
    matches: number,
    timePlayed: string,
    updated: string,
    modo: string
}
const StatCard = ({ wins, kills, topN, topNN, deaths, kda, matches, timePlayed, updated, modo }: StatCardProps) => {
    const commonClass = 'pl-3 text-gray-500'
    return (
        <div className={`${balsamiqSans.className} font-bold relative m-auto bg-bg-header text-base h-[342px] pt-[37px] rounded-md w-[98%] md:w-[432px]`}>
            <p className={commonClass}>Ganadas: <span className='text-white'>{wins}</span></p>
            <p className={commonClass}>Asesinatos: <span className='text-white'>{kills}</span></p>
            {modo === 'Solo' && <p className={commonClass}>Top 10:<span className='text-white'> {topN}</span></p>}
            {modo === 'Solo' && <p className={commonClass}>Top 25: <span className='text-white'>{topNN}</span></p>}
            {modo === 'Duo' && <p className={commonClass}>Top 5: <span className='text-white'>{topN}</span></p>}
            {modo === 'Duo' && <p className={commonClass}>Top 12: <span className='text-white'>{topNN}</span></p>}
            {modo === 'Trio' && <p className={commonClass}>Top 3: <span className='text-white'>{topN}</span></p>}
            {modo === 'Trio' && <p className={commonClass}>Top 6: <span className='text-white'>{topNN}</span></p>}
            {modo === 'Squad' && <p className={commonClass}>Top 3: <span className='text-white'>{topN}</span></p>}
            {modo === 'Squad' && <p className={commonClass}>Top 6: <span className='text-white'>{topNN}</span></p>}
            {modo !== 'Trio' && <p className={commonClass}>Muertes: <span className='text-white'>{deaths}</span></p>}
            <p className={commonClass}>K / D: <span className='text-white'>{kda}</span></p>
            <p className={commonClass}>Partidas: <span className='text-white'>{matches}</span></p>
            <p className={commonClass}>% Victorias: <span className='text-white'>{Math.floor((wins / matches) * 100)}%</span></p>
            <p className={commonClass}>Tiempo Jugado: <span className='text-white'>{timePlayed}</span></p>
            <p className={commonClass}>Actualizado: <span className='text-white'> {updated}</span></p>
            <div className={`${luckiestGuy.className} absolute bottom-0 left-0 right-0 w-full bg-yellowForrnite text-bg-header text-center text-[40px] h-11 flex items-center justify-center`}><p>{modo}</p></div>
        </div>
    )
}

export default StatCard