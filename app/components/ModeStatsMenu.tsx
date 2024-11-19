'use client'
import { Account, All, CombinedStats } from "../api/stats"
import StatCard from "./StatCard";
import { useSeason } from "../hooks/useSeason";
import { balsamiqSans, luckiestGuy } from '../assets/fonts'
import { BattlePass } from '../api/stats';
type ModeType = 'solo' | 'duo' | 'trio' | 'squad';
import star from '../assets/star.svg'

interface ModeStatsMenuProps {
    stats?: { allSeason: CombinedStats, season: All },
    battlePass?: BattlePass,
    account?: string
}
export const ModeStatsMenu = ({ stats, battlePass, account }: ModeStatsMenuProps) => {

    const { selectedSeason, selectedMode, handleModeChange, handleSeasonChange } = useSeason({ stats: stats })
    if (!stats || !stats[selectedSeason].duo && !stats[selectedSeason].solo && !stats[selectedSeason].trio && !stats[selectedSeason].squad) {
        return null; // Otra acción, dependiendo de tu lógica
    }

    const selectedStats = stats[selectedSeason][selectedMode];

    if (!selectedStats) {
        return null; // Otra acción, dependiendo de tu lógica
    }
    const modes = Object.keys(stats?.[selectedSeason] || []).filter(mode => stats![selectedSeason][mode as ModeType]) as ModeType[];

    return (
        <>
            {
                <>
                    <div className='mt-2 mb- m-auto'>
                        <h2 className={`${luckiestGuy.className} text-center text-3xl`}>{account} </h2>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={star.src} alt="" />
                            <h2 className={`${luckiestGuy.className} text-center text-2xl`}> {battlePass?.level} Nivel Pase de Batalla</h2>
                        </div>
                    </div>
                    <StatCard key='allSeasons' stats={stats.allSeason} battlePass={battlePass} isAll={true} />

                    {selectedSeason && selectedStats ?
                        <div className={`flex w-full flex-row items-start justify-between flex-wrap self-start gap-4 my-4 ${balsamiqSans.className}`}>
                            <select value={selectedSeason} onChange={handleSeasonChange} className="p-2 bg-gray-800 text-white rounded-md outline-none border-none ml-4">
                                <option value="season" className={`${balsamiqSans.className} outline-none border-none`}>Esta Temporada</option>
                                <option value="allSeason" className="outline-none border-none">Todas Temporadas</option>
                            </select>

                            <select value={selectedMode} onChange={handleModeChange} className="p-2 bg-gray-800 text-white rounded-md outline-none border-none mr-4"
                            >
                                {modes.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                ))}
                            </select>


                            <div className="w-full">
                                <StatCard key='seasons' stats={selectedStats} mode={selectedMode} battlePass={battlePass} isAll={false} />
                            </div>
                        </div>
                        :
                        <h2>No haz jugado partidas esta temporada 😢</h2>
                    }
                </>
            }
        </>)
}
