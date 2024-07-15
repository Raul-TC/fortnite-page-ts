import React, { Suspense } from 'react'
import { SkinsCollection } from '@/app/components/SkinsCollection'
import SkeletonCosmetics from '../components/SkeletonCosmetics'
export const dynamic = 'auto'

export const metadata = {
    title: 'Cosméticos',
    description: 'Todos los cosméticos de Fortnite',
    icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
    facebook: {
        card: '',
        title: 'Cosméticos',
        description: 'Todos los cosméticos de Fortnite'
    }
}

const Cosmetics = async () => {
    // const { allItems, rarities } = await getCosmetics()
    return (
        <Suspense fallback={<SkeletonCosmetics />}>
            <SkinsCollection />
        </Suspense>
        // <h1>Collections</h1>
    )
}

export default Cosmetics