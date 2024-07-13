import { URL_BPASS, URL_COSMETICS, URL_ITEM, URL_RARITIES, URL_SHOP, URL_STATS, URL_STATS_SEASON } from '@/KEY'
import { ArrData, BattlePass, Display, PagesBattlePass, SeasonDates, Video, type Reward } from '../api/battlePass.d'
import { Rarities } from '../api/rarities'
import { Cosmetics, FormattedItem, RarityItem, TypesCosmetics } from '../api/cosmetics.d'
import { Categories, LastUpdate, Shop, ShopArray, ShopElement } from '../api/shop.d'
import { CombinedStats, CustomStats, URLStats, URLStatsID, } from '../api/stats'
import { Item, ItemID } from '../api/itemID'

interface NextFetchOptions extends RequestInit {
    next?: {
        revalidate?: number;
        tags?: string[];
        cache?: 'force-cache' | 'only-cache' | 'force-no-store' | 'only-no-store' | 'no-store';
    };
}

interface GetStatsParams {
    name: string;
    accountType: string;
}

export async function fetchWithHeaders(url: string, headers: Record<string, string>, options: NextFetchOptions = {}): Promise<any> {
    const response = await fetch(url, { headers, ...options });
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    return response.json();
}


export async function getStats({ name, accountType }: GetStatsParams): Promise<CustomStats> {
    try {
        const [stats, season]: [URLStats, URLStats] = await Promise.all([
            fetchWithHeaders(URL_STATS({ user: name, type: accountType }), {
                'Content-Type': 'application/json',
                Authorization: process.env.API_FORTNITEV2 || '',
            }, { cache: 'no-store' }),
            fetchWithHeaders(URL_STATS_SEASON({ user: name, type: accountType }), {
                'Content-Type': 'application/json',
                Authorization: process.env.API_FORTNITEV2 || '',
            }, { cache: 'no-store' }),
        ])

        const statsOtherAPI: URLStatsID = await fetchWithHeaders(`https://fortniteapi.io/v1/stats?account=${stats.data.account.id}`, {
            'Content-Type': 'application/json',
            Authorization: process.env.API_FORTNITE || '',
        }, { cache: 'no-store' });

        const lifetimeStats: CombinedStats = {
            ...stats.data.stats.all,
            trio: statsOtherAPI.global_stats.trio,
        };
        const { accountLevelHistory } = statsOtherAPI;

        return {
            ...stats,
            ...stats.data,
            accountLevelHistory,
            stats: {
                lifetime: lifetimeStats,
                season: season.data.stats.all,
            },
            status: stats.status
        };

    } catch (error) {
        return {
            status: 200, // Usando 200 para indicar que la función se ejecutó con éxito
            stack: true // Bandera personalizada para indicar que ocurrió un error
        };
    }
}

export async function getRarities(): Promise<Rarities> {
    try {
        const { rarities, series } = await fetchWithHeaders(URL_RARITIES, {
            'Content-Type': 'application/json',
            Authorization: process.env.API_FORTNITE || ''
        })

        return { rarities, series }
    } catch (error) {
        throw { error }
    }
}

export async function getBattlePass(): Promise<{ arr: ArrData[], info: Display, seasonDates: SeasonDates, videos: Video[] }> {
    try {
        const res: BattlePass = await fetchWithHeaders(URL_BPASS, {
            'Content-Type': 'application/json',
            Authorization: process.env.API_FORTNITE || ''
        })

        const pagesBattlePass: PagesBattlePass = {}
        const pages: number[] = [...new Set(res.rewards.map((item: Reward) => item.page))]
        pages.forEach(el => pagesBattlePass[el] = [])

        const { rarities } = await getRarities()

        const raritiesMap = Object.fromEntries(rarities.map(el => [el.name.toUpperCase(), el.image]))

        const addBg = res.rewards.map((el: Reward) => {
            const bgDefault = raritiesMap[el.item.rarity?.name.toUpperCase()] || ''

            return { ...el, bg: bgDefault }
        })
        addBg.forEach((el: Reward) => {
            const datt = pagesBattlePass[el.page].map(ab => ab.offerId === el.offerId)

            !datt.includes(true) && pagesBattlePass[el.page].push({ ...el })
        })

        const arr: ArrData[] = Object.entries(pagesBattlePass).map(([key, value]) => ({ page: parseInt(key, 10), data: value }))

        return { arr, info: res.displayInfo, seasonDates: res.seasonDates, videos: res.videos }
    } catch (error) {
        throw error
    }

}

export async function getShop(): Promise<{ shop: ShopArray[], lastUpdated: LastUpdate }> {
    try {
        const { shop, lastUpdate }: Shop = await fetchWithHeaders(URL_SHOP, {
            'Content-Type': 'application/json',
            Authorization: process.env.API_FORTNITE || '',
        }, { cache: 'no-store' })

        const categories = [...new Set(shop.map((section) => section.section.name))]

        const dataFiltered = categories.reduce((acc, el) => {
            acc[el || 'Destacados'] = [];
            return acc;
        }, {} as Categories);

        const { rarities, series } = await getRarities()

        const seriesMap = Object.fromEntries(series.map(el => [el.name.toUpperCase(), el.image]))
        const raritiesMap = Object.fromEntries(rarities.map(el => [el.name.toUpperCase(), el.image]))

        const addBg: ShopElement[] = shop.map(el => ({
            ...el,
            bg: el.series?.name.toUpperCase() ? seriesMap[el.series.name.toUpperCase()] : '',
            bgDefault: el.rarity?.name.toUpperCase() ? raritiesMap[el.rarity.name.toUpperCase()] : ''
        }));

        // addBg.forEach(item => {
        //     if (!dataFiltered[item.section.name]) {
        //         dataFiltered.Destacados.push({ ...item })
        //     } else {
        //         const datt = dataFiltered[item.section.name].map(ab => {
        //             return ab.displayName === item.displayName
        //         })

        //         !datt.includes(true) && dataFiltered[item.section.name].push({ ...item })
        //     }
        // })
        addBg.forEach(item => {
            const sectionName = item.section.name || 'Destacados';
            if (!dataFiltered[sectionName].some(ab => ab.displayName === item.displayName)) {
                dataFiltered[sectionName].push({ ...item });
            }
        });

        return {
            shop: Object.entries(dataFiltered).map(([key, value]) => ({ section: key, data: value })),
            lastUpdated: lastUpdate
        }
    } catch (error) {
        throw error
    }
}

export async function getCosmetics(): Promise<{
    allItems: FormattedItem[],
    rarities: TypesCosmetics
}> {

    try {

        const { items }: Cosmetics = await fetchWithHeaders(URL_COSMETICS, {
            'Content-Type': 'application/json',
            Authorization: process.env.API_FORTNITE || ''
        })

        const { rarities, series } = await getRarities()

        const formatedData: FormattedItem[] = items.map(el => {
            return { id: el.id, type: el.type, name: el.name, rarity: el.rarity, series: el.series, images: el.images, price: el.price }
        })
        const seriesMap = Object.fromEntries(series.map(el => [el.name.toUpperCase(), el.image]))
        const raritiesMap = Object.fromEntries(rarities.map(el => [el.name.toUpperCase(), el.image]))

        const addBg = formatedData.map(el => {

            const bgImage = el.series ? seriesMap[el.series.name.toUpperCase()] : ''
            const bgDefault = el.rarity ? raritiesMap[el.rarity.name.toUpperCase()] : ''

            if (el.type.name === 'itemaccess') {
                return { ...el, type: { id: 'Pase de Batalla', name: 'Pase de Batalla' }, bg: bgImage, bgDefault }
            }
            return { ...el, bg: bgImage, bgDefault }
        })

        const filter: RarityItem[] = rarities.filter(el => el.name !== 'Exótico' && el.name !== 'MÍTICA' && el.name !== '')
        const unique: Record<string, boolean> = {}
        const tipos: RarityItem[] = addBg.filter(type => {
            const key = `${type.type.name}`
            if (!unique[key]) {
                unique[key] = true
                return true
            }
            return false
        }).map(type => {
            if (type.type.name === 'Accesorio mochilero') {
                return ({ name: 'Mochila', id: 'Mochila' })
            } else {
                return ({ name: type.type.name, id: type.type.name })
            }
        })
        const arrayFiltrado = tipos.filter(el => ['Traje', 'Pico', 'Gesto', 'Ala delta', 'Mochila', 'Mascota', 'Envoltorio', 'Grafiti', 'Música', 'Pista de improvisación', 'Pantalla de carga', 'Lote de Objetos', 'Kit de LEGO®', 'Decoración'].includes(el.name))

        const todasRarity: RarityItem = { name: 'Todas', id: 'Todas', image: '' };

        filter.unshift(todasRarity)
        series.unshift(todasRarity)
        arrayFiltrado.unshift(todasRarity)
        return {
            allItems: addBg,
            rarities:
            {
                rareza: filter,
                series: series,
                tipos: arrayFiltrado
            }
        }
    } catch (error) {
        throw error
    }
}

export async function getItem({ idSkin }: { idSkin: string }): Promise<Item> {

    try {
        const { item }: ItemID = await fetchWithHeaders(URL_ITEM({ id: idSkin }), {
            'Content-Type': 'application/json',
            Authorization: process.env.API_FORTNITE || '',
        }, { cache: 'no-store' })

        const { series } = await getRarities()


        const seriesMap = Object.fromEntries(series.map(el => [el.name.toUpperCase(), el.image]))

        const addBg = () => {
            const bgImage = seriesMap[item.series?.name.toUpperCase() || ''] || ''
            let precio = item.price
            return {
                ...item, bg: bgImage, price: { regularPrice: precio, finalPrice: precio, floorPrice: precio }
            }
        }

        const res: Item = addBg()
        return res

    } catch (error) {
        throw error
    }

}