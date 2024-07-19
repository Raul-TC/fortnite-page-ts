'use client'
import { All, CombinedStats } from "../api/stats"
import StatCard from "./StatCard";
import { useSeason } from "../hooks/useSeason";
import { balsamiqSans } from '../assets/fonts'
import { BattlePass } from '../api/stats';
type ModeType = 'solo' | 'duo' | 'trio' | 'squad';

interface ModeStatsMenuProps {
    stats?: { allSeason: CombinedStats, season: All },
    battlePass?: BattlePass
}
export const ModeStatsMenu = ({ stats, battlePass }: ModeStatsMenuProps) => {
    // const [mainPage, setMainPage] = useState(false)
    const { mainPage, selectedSeason, selectedMode, handleModeChange, handleSeasonChange } = useSeason({ stats: stats })
    if (!stats || !stats[selectedSeason]) {
        return null; // Otra acción, dependiendo de tu lógica
    }
    const selectedStats = stats[selectedSeason][selectedMode];
    if (!selectedStats) {
        return null; // Otra acción, dependiendo de tu lógica
    }
    const modes = Object.keys(stats?.[selectedSeason] || {}).filter(mode => stats![selectedSeason][mode as ModeType]) as ModeType[];

    // const searchParams = useSearchParams();

    // useEffect(() => {
    //     const pathname = window.location.pathname;
    //     console.log(pathname)
    //     const name = searchParams.get('name');
    //     const accountType = searchParams.get('accountType');

    //     if (name && accountType) {
    //         setMainPage(false);
    //     } else {
    //         setMainPage(true);
    //     }
    // }, [searchParams]);
    return (
        <>
            <StatCard key='allSeasons' stats={stats.allSeason} battlePass={battlePass} isAll={true} />
            {
                selectedStats && !mainPage && (

                    <div className={`flex w-full flex-row items-start justify-between flex-wrap self-start gap-4 my-4 ${balsamiqSans.className}`}>
                        <select value={selectedSeason} onChange={handleSeasonChange} className="p-2 bg-gray-800 text-white rounded-md outline-none border-none">
                            <option value="season" className={`${balsamiqSans.className} outline-none border-none`}>Esta Temporada</option>
                            <option value="allSeason" className="outline-none border-none">Todas Temporadas</option>
                        </select>

                        <select value={selectedMode} onChange={handleModeChange} className="p-2 bg-gray-800 text-white rounded-md outline-none border-none"
                        >
                            {modes.map(mode => (
                                <option key={mode} value={mode}>{mode}</option>
                            ))}
                        </select>

                        <div className="w-full">
                            {/* {selectedStats && mainPage && ( */}
                            <StatCard key='seasons' stats={selectedStats} mode={selectedMode} battlePass={battlePass} isAll={false} />
                            {/* )} */}
                        </div>
                    </div>)


            }
        </>)
}
