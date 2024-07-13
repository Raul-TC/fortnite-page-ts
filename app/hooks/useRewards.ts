import { useMemo } from "react";
import { rewardsFiltered } from "../utils/utils";
import { ArrData } from "../api/battlePass";

interface UseRewardsParams {
    arr: ArrData[];
    currentPage: number;
}

export function useRewards({ arr, currentPage }: UseRewardsParams) {
    const rewards = useMemo(() => rewardsFiltered({ arr, currentPage }), [arr, currentPage]);
    const { page, data } = rewards[0];

    return { page, data };
}
