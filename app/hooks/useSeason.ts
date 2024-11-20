'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { All, CombinedStats } from "../api/stats";

type SeasonType = 'season' | 'allSeason';
type ModeType = 'solo' | 'duo' | 'trio' | 'squad';

export function useSeason({ stats }: { stats?: { allSeason: CombinedStats, season: All } }) {
    const [selectedSeason, setSelectedSeason] = useState<SeasonType>('season');
    const [selectedMode, setSelectedMode] = useState<ModeType>('solo');
    const handleSeasonChange = (e: ChangeEvent<HTMLSelectElement>) => {

        const newSeason = e.target.value as SeasonType;
        setSelectedSeason(newSeason);

        const firstMode = Object.keys(stats![newSeason])[0] as ModeType;
        setSelectedMode(firstMode);
    };

    useEffect(() => {
        const firstMode = Object.keys(stats![selectedSeason])[0] as ModeType;
        setSelectedMode(firstMode);
    }, [])

    const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedMode(e.target.value as ModeType);
    };

    return { selectedSeason, selectedMode, handleModeChange, handleSeasonChange }
}