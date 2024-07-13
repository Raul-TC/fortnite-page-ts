import { Suspense } from 'react'
import ItemsShop from '../components/ItemsShop'
import CountDown from '../components/CountDown'
import SkeletonCards from '../components/SkeletonCards'

export const metadata = {
    title: 'Tienda Fortnite HOY',
    description: 'Tienda Actual de Fortnite',
    icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
    facebook: {
        card: '',
        title: 'Tienda de HOY Fortnite',
        description: 'Tienda Actualizada de la tienda de fortnite'
    }
}
export const dynamic = 'force-dynamic'

export default async function Home() {
    // console.log(new Date(shop.lastUpdated.date.getUTCDate))
    return (
        <Suspense fallback={<SkeletonCards />}>
            <CountDown isShop date="false" />
            {/* <h1>Ultima actualizacion:{`${new Date(shop.lastUpdated.date)}`}</h1> */}
            <ItemsShop />
        </Suspense>
    )
}

// interface NextFetchOptions extends RequestInit {
//     next?: {
//         revalidate?: number;
//         tags?: string[];
//         cache?: 'force-cache' | 'only-cache' | 'force-no-store' | 'only-no-store' | 'no-store';
//     };
// }

// export async function getShop(): Promise<ShopArray[]> {
//     try {
//         const fetchShop = await fetch(URL_SHOP, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cache-Control': 'no-cache, no-store, must-revalidate',
//                 'Pragma': 'no-cache',
//                 'Expires': '0',
//                 Authorization: process.env.API_FORTNITE || ''
//             },
//             next: { cache: 'no-store' }
//         } as NextFetchOptions)

//         if (!fetchShop.ok) {
//             throw new Error(`Error: ${fetchShop.status} ${fetchShop.statusText}`)
//         }
//         const { shop, lastUpdate }: Shop = await fetchShop.json()

//         const categories = [...new Set(shop.map((section) => section.section.name))]

//         console.log(lastUpdate)
//         const dataFiltered = categories.reduce((acc, el) => {
//             acc[el || 'Destacados'] = [];
//             return acc;
//         }, {} as Categories);
//         // categories.forEach(el => {
//         //     if (el === null || el === '') {
//         //         dataFiltered.Destacados = []
//         //     } else {
//         //         dataFiltered[el] = []
//         //     }
//         // })
//         const { rarities, series } = await getRarities()

//         const seriesMap = Object.fromEntries(series.map(el => [el.name.toUpperCase(), el.image]))
//         const raritiesMap = Object.fromEntries(rarities.map(el => [el.name.toUpperCase(), el.image]))

//         const addBg: ShopElement[] = shop.map(el => ({
//             ...el,
//             bg: el.series?.name.toUpperCase() ? seriesMap[el.series.name.toUpperCase()] : '',
//             bgDefault: el.rarity?.name.toUpperCase() ? raritiesMap[el.rarity.name.toUpperCase()] : ''
//         }));

//         // addBg.forEach(item => {
//         //     if (!dataFiltered[item.section.name]) {
//         //         dataFiltered.Destacados.push({ ...item })
//         //     } else {
//         //         const datt = dataFiltered[item.section.name].map(ab => {
//         //             return ab.displayName === item.displayName
//         //         })

//         //         !datt.includes(true) && dataFiltered[item.section.name].push({ ...item })
//         //     }
//         // })

//         addBg.forEach(item => {
//             const sectionName = item.section.name || 'Destacados';
//             if (!dataFiltered[sectionName].some(ab => ab.displayName === item.displayName)) {
//                 dataFiltered[sectionName].push({ ...item });
//             }
//         });

//         return Object.entries(dataFiltered).map(([key, value]) => ({ section: key, data: value }))
//     } catch (error) {
//         throw error
//     }
// }