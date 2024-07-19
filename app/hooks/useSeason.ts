'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { All, CombinedStats } from "../api/stats";
import { useRouter, useSearchParams } from "next/navigation";

type SeasonType = 'season' | 'allSeason';
type ModeType = 'solo' | 'duo' | 'trio' | 'squad';

export function useSeason({ stats }: { stats?: { allSeason: CombinedStats, season: All } }) {
    const [selectedSeason, setSelectedSeason] = useState<SeasonType>('season');
    const [selectedMode, setSelectedMode] = useState<ModeType>('solo');
    const [mainPage, setMainPage] = useState(false)



    const handleSeasonChange = (e: ChangeEvent<HTMLSelectElement>) => {

        const newSeason = e.target.value as SeasonType;
        setSelectedSeason(newSeason);

        const firstMode = Object.keys(stats![newSeason])[0] as ModeType;
        setSelectedMode(firstMode);
    };

    const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedMode(e.target.value as ModeType);
    };

    const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(() => {
        const pathname = window.location.pathname;
        console.log(pathname)
        const name = searchParams.get('name');
        const accountType = searchParams.get('accountType');

        if (name && accountType) {
            setMainPage(false);
        } else {
            setMainPage(true);
            router.refresh()

        }
    }, [searchParams]);
    return { mainPage, selectedSeason, selectedMode, handleModeChange, handleSeasonChange }
}