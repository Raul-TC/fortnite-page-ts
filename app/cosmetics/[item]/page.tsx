export const dynamic = 'force-dynamic'
import { ItemID } from '@/app/api/itemID'
// export const dynamicParams = true
import DetailsItem from '@/app/components/DetailsItem'
import SkeletonItem from '@/app/components/SkeletonItem'
import { URL_ITEM } from '@/KEY'
import React, { Suspense } from 'react'


interface ItemProps {
    params: {
        item: string
    }
}

const Item = async ({ params }: ItemProps) => {

    return (
        <>
            <Suspense fallback={<SkeletonItem />}>
                <DetailsItem itemID={params.item} />
            </Suspense>
        </>
    )
}

export default Item


export async function generateMetadata({ params }: ItemProps) {
    try {
        const parr = params
        const skin = await fetch(URL_ITEM({ id: params.item }), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.API_FORTNITE || ''
            },
            cache: 'no-store'
        },)

        if (!skin.ok) {
            throw new Error(`Error al obtener la metadata 😔: ${skin.status} ${skin.statusText}`)
        }

        const resp: ItemID = await skin.json()

        return {
            title: `Cosméticos / ${resp.item.name}`,
            icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
            description: resp.item.name,
            facebook: {
                card: '',
                title: `${resp.item.name}`,
                description: `Skin ${resp.item.name}`
            }
        }
    } catch (error) {
        return { error }
    }
}