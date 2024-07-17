'use client'
import { All, CombinedStats } from "../api/stats"
import StatCard from "./StatCard";
import { useSeason } from "../hooks/useSeason";

type ModeType = 'solo' | 'duo' | 'trio' | 'squad';

interface ModeStatsMenuProps {
    stats?: { allSeason: CombinedStats, season: All }
}
export const ModeStatsMenu = ({ stats }: ModeStatsMenuProps) => {

    const { selectedSeason, selectedMode, handleModeChange, handleSeasonChange } = useSeason({ stats: stats })
    if (!stats || !stats[selectedSeason]) {
        return null; // Otra acción, dependiendo de tu lógica
    }
    const selectedStats = stats[selectedSeason][selectedMode];
    if (!selectedStats) {
        return null; // Otra acción, dependiendo de tu lógica
    }
    const modes = Object.keys(stats?.[selectedSeason] || {}).filter(mode => stats![selectedSeason][mode as ModeType]) as ModeType[];
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
                {selectedStats && (
                    <StatCard stats={selectedStats} mode={selectedMode} />
                )}
            </div>
        </div>
    )
}
