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

// interface PaginationNumberProps {
//     page: number | string
//     href: string
//     isActive: boolean
//     position: string
// }
// function PaginationNumber({ page, href, isActive, position }: PaginationNumberProps) {
//     const className = `flex h-10 w-10 items-center justify-center text-sm border 
//     ${position === 'first' || position === 'single' ? 'rounded-l-md' : ''} 
//     ${position === 'last' || position === 'single' ? 'rounded-r-md' : ''} 
//     ${isActive ? 'z-10 bg-blue-600 border-blue-600 text-white' : ''} 
//     ${!isActive && position !== 'middle' ? 'hover:bg-red-200' : ''} 
//     ${position === 'middle' ? 'text-gray-300' : ''}`

//     return isActive || position === 'middle'
//         ? (
//             <div className={className}>{page}</div>
//         )
//         : (
//             <Link href={href} className={className} scroll={false}>
//                 {page}
//             </Link >
//         )
// }
// interface PaginationArrowProps {
//     href: string
//     direction: 'left' | 'right'
//     isDisabled: boolean
// }

// function PaginationArrow({ href, direction, isDisabled }: PaginationArrowProps) {
//     const className = `flex h-10 w-10 items-center justify-center rounded-md border 
//     ${isDisabled ? 'pointer-events-none text-gray-300' : 'hover:bg-red-100'} 
//     ${direction === 'left' ? 'mr-2 md:mr-4' : 'ml-2 md:ml-4'}`

//     const icon =
//         direction === 'left'
//             ? (
//                 <FaArrowLeft className='w-4' />
//             )
//             : (
//                 <FaArrowRight className='w-4' />
//             )


//     return !isDisabled &&
//         <Link className={className} href={href} scroll={false} >
//             {icon}
//         </Link>

// }

export default Pagination