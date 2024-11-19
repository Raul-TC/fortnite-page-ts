import { getStats } from "@/app/services/fetchData";
import { URL_STATS, URL_STATS_SEASON } from "@/KEY";
import { NextResponse } from "next/server";
import { CombinedStats, URLStats, URLStatsID } from "../../../stats";

interface NextFetchOptions extends RequestInit {
    next?: {
        revalidate?: number;
        tags?: string[];
        cache?: 'force-cache' | 'only-cache' | 'force-no-store' | 'only-no-store' | 'no-store';
    };
}

async function fetchWithHeaders(url: string, headers: Record<string, string>, options: NextFetchOptions = {}): Promise<any> {
    const response = await fetch(url, { headers, ...options });
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

export async function GET(req: Request, { params }: { params: { name: string | undefined, accountType: string | undefined } }) {


    const { name, accountType } = params
    if (name === '' || accountType === '') {
        return NextResponse.json({ error: 'Name and AccountType are required' }, { status: 400 });
    }
    console.log('EN EL SERVER')
    try {
        const API_FORTNITEV2 = process.env.API_FORTNITEV2 || '';
        const API_FORTNITE = process.env.API_FORTNITE || '';

        const [stats, season]: [URLStats, URLStats] = await Promise.all([
            fetchWithHeaders(`https://fortnite-api.com/v2/stats/br/v2/?name=${name}&accountType=${accountType}&timeWindow=lifetime`, {
                'Content-Type': 'application/json',
                Authorization: API_FORTNITEV2,
            }, {
                next: {
                    revalidate: 60
                }
            }),
            fetchWithHeaders(`https://fortnite-api.com/v2/stats/br/v2/?name=${name}&accountType=${accountType}&timeWindow=season`, {
                'Content-Type': 'application/json',
                Authorization: API_FORTNITEV2,
            }, {
                next: {
                    revalidate: 60
                }
            }),
        ])

        console.log({ stats })
        console.log({ season })

        const statsOtherAPI: URLStatsID = await fetchWithHeaders(`https://fortniteapi.io/v1/stats?account=${stats.data.account.id}`, {
            'Content-Type': 'application/json',
            Authorization: API_FORTNITE,
        }, {
            next: {
                revalidate: 60
            }
        });

        const lifetimeStats: CombinedStats = {
            // ...stats.data.stats.all,
            solo: stats.data.stats.all.solo,
            duo: stats.data.stats.all.duo,
            trio: statsOtherAPI.global_stats.trio,
            squad: stats.data.stats.all.squad,
        };

        return NextResponse.json({
            ...stats,
            ...stats.data,
            stats: {
                allSeason: lifetimeStats,
                season: {
                    solo: season.data.stats.all.solo,
                    duo: season.data.stats.all.duo,
                    trio: season.data.stats.all.trio,
                    squad: season.data.stats.all.squad,
                },
            },
            status: stats.status
        })
    } catch (error: any) {
        console.error('Error fetching player stats:', error.message);
        return NextResponse.json(
            { message: 'Error fetching player stats', error: error.message },
            { status: 500 }
        );
    }
}