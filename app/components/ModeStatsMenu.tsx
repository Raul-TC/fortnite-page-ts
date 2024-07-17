'use client'
import { All, CombinedStats } from "../api/stats"
import StatCard from "./StatCard";
import { useSeason } from "../hooks/useSeason";

type ModeType = 'solo' | 'duo' | 'trio' | 'squad';


export const ModeStatsMenu = ({ stats }: { stats?: { allSeason: CombinedStats, season: All } }) => {

    const { selectedSeason, selectedMode, handleModeChange, handleSeasonChange } = useSeason({ stats: stats })

    const modes = Object.keys(stats?.[selectedSeason] || {}).filter(mode => stats![selectedSeason][mode as ModeType]) as ModeType[];
    if (!stats) {
        return
    }
    return (
        <div className="flex w-full flex-row items-start justify-between flex-wrap self-start gap-4">
            <select value={selectedSeason} onChange={handleSeasonChange} className="p-2 bg-gray-800 text-white rounded-md outline-none border-none"
            >
                <option value="season" className="outline-none border-none">Season</option>
                <option value="allSeason" className="outline-none border-none">All Season</option>
            </select>

            <select value={selectedMode} onChange={handleModeChange} className="p-2 bg-gray-800 text-white rounded-md outline-none border-none"
            >
                {modes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                ))}
            </select>

            <div className="w-full">
                {stats![selectedSeason]![selectedMode] && (
                    <StatCard stats={stats![selectedSeason][selectedMode]} mode={selectedMode} />
                )}
            </div>
        </div>
    )
}
