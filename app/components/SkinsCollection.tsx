import { Suspense } from 'react'
import { AllSkins } from './AllSkins'
import { getCosmetics } from '../services/fetchData'
import SkeletonCosmetics from './SkeletonCosmetics'


export const SkinsCollection = async () => {
    const { allItems, rarities } = await getCosmetics()

    return (
        <>
            <Suspense fallback={<SkeletonCosmetics />}>
                <AllSkins allItems={allItems} rarities={rarities} />
            </Suspense>
        </>)
}
