export const dynamic = 'force-dynamic'
// export const dynamicParams = true
import DetailsItem from '@/app/components/DetailsItem'
import SkeletonItem from '@/app/components/SkeletonItem'
import React, { Suspense } from 'react'
import { URLSearchParams } from 'url'


interface ItemProps {
    params: {
        item: string
    }
}

const Item = async ({ params }: ItemProps) => {

    // const details = await getItem({ itemID: params.item })
    console.log(params)

    return (
        <>
            <Suspense fallback={<SkeletonItem />}>
                {/* <DetailsItem itemID={details} /> */}
                <DetailsItem itemID={params.item} />
            </Suspense>
        </>
    )
}

export default Item
