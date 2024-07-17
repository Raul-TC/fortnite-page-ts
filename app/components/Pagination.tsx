'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useAllPages } from '../hooks/useAllPages'
import { PaginationArrow } from './PaginationArrow'
import { PaginationNumber } from './PaginationNumber'
import React from 'react'

interface Props {
    totalPages: number
}
const Pagination = React.memo(({ totalPages }: Props) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page') || 1)
    const { allPages, createPageURL } = useAllPages({ currentPage, totalPages, searchParams, pathname })


    const determinePosition = (index: number, length: number, page: number | string) => {
        if (length === 1) return 'single'
        if (index === 0) return 'first'
        if (index === length - 1) return 'last'
        if (page === '...') return 'middle'
        return ''
    }
    return (
        <>
            <div className='w-full m-auto flex items-center justify-center'>

                <div className='inline-flex'>
                    <PaginationArrow
                        direction='left'
                        href={createPageURL(currentPage - 1)}
                        isDisabled={currentPage <= 1}
                    />

                    <div className='flex -space-x-px'>
                        {allPages.map((page, index) => {
                            return (
                                <PaginationNumber
                                    key={`${page}_${index}`}
                                    href={createPageURL(page)}
                                    page={page}
                                    position={determinePosition(index, allPages.length, page)}
                                    isActive={currentPage === page}
                                />
                            )
                        })}
                    </div>

                    <PaginationArrow
                        direction='right'
                        href={createPageURL(currentPage + 1)}
                        isDisabled={currentPage >= totalPages}
                    />
                </div>
            </div>
        </>
    )
})

export default Pagination