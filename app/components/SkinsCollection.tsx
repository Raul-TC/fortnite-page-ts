'use client'
import { useCosmetics } from '../hooks/useCosmetics'
import { FormattedItem, TypesCosmetics } from '../api/cosmetics'
import { useExpandItem } from '../hooks/useExpandItem'
import Menu from './Menu'
import InfiniteScroll from 'react-infinite-scroll-component'
import BackgroundCard from './BackgroundCard'
import Link from 'next/link'

interface SkinsCollectionsProps {
    allItems: FormattedItem[],
    rarities: TypesCosmetics
}

export const SkinsCollection = ({ allItems, rarities }: SkinsCollectionsProps) => {
    const { data, filters, loadMoreData, handleFilters } = useCosmetics({ allItems })
    const { expandedItem, handleExpandItem } = useExpandItem()
    return (
        <>
            <div className='flex gap-4 flex-wrap  justify-between items-center'>

                <input
                    name='searchSkin' placeholder='Jinx Arcane' className='bg-yellowForrnite text-bg-body py-2 px-4 rounded-md outline-none w-[50%]' onChange={(e) => {
                        handleFilters({ data: { search: e.target.value } })
                    }}
                />
                {Object.entries(rarities).map(([key, value], index) => {
                    return (
                        <Menu
                            key={`${index}_${key}`}
                            nameType={key}
                            index={index}
                            value={value}
                            expandedItem={expandedItem}
                            handleFilters={handleFilters}
                            filters={filters}
                            handleExpandItem={handleExpandItem}
                        />
                    );
                })}

            </div>
            <InfiniteScroll
                dataLength={data.length} hasMore={data.length < allItems.length} next={loadMoreData} loader
            >
                <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 grid-flow-dense h-full w-full mt-8'>
                    {data.map((child, index) => {
                        return <Link
                            key={`${index}_${child.id}`}
                            href={`/cosmetics/${child.id}`}
                            className=' rounded-lg self-start cursor-pointer hover:scale-110 active:scale-90 hover:z-40 transition-transform ease-in-out duration-200'
                        >
                            <div className='relative w-full h-full overflow-hidden rounded-md'>
                                <img src={child.images.icon} alt={`image_${child.name}`} className='w-full h-full rounded-md absolute ' />
                                <img src={child.bg === '' ? child.bgDefault : child.bg} alt='' className='w-full h-full ' />
                                <BackgroundCard displayName={child.name} isFree='false' />
                            </div>
                        </Link>
                    }
                    )}
                </div>
            </InfiniteScroll>
        </>)
}
