'use client'
import { useCallback, useEffect, useState } from 'react'
import { FormattedItem } from '../api/cosmetics'
export interface Filters {
    [key: string]: string;
}

export const useCosmetics = ({ allItems }: { allItems: FormattedItem[] }) => {
    const [data, setData] = useState(allItems.slice(0, 50))
    const [displayCount, setDisplayCount] = useState(50)
    const [filters, setFilters] = useState<Filters>({ rareza: 'Todas', series: 'Todas', tipos: 'Todas', search: '' })

    const loadMoreData = () => {
        setDisplayCount(prevCount => prevCount + 50)
    }

    const handleFilters = useCallback(({ data }: { data: Filters }) => {
        setFilters(prevData => ({ ...prevData, ...data }))
    }, [data])

    useEffect(() => {
        let filteredData = allItems

        if (filters.rareza === 'Todas' && filters.series === 'Todas' && filters.tipos === 'Todas' && filters.search === '') {
            filteredData = allItems
        }

        if (filters.rareza !== 'Todas') {
            // eslint-disable-next-line eqeqeq
            filteredData = filteredData.filter(el => el.rarity?.name.toUpperCase() == filters.rareza.toUpperCase())
        }

        if (filters.series !== 'Todas') {
            // eslint-disable-next-line eqeqeq
            filteredData = filteredData.filter(el => el.series?.name.toUpperCase() == filters.series.toUpperCase())
        }

        if (filters.tipos !== 'Todas') {
            // eslint-disable-next-line eqeqeq
            filteredData = filteredData.filter(el => el.type?.name.toUpperCase() == filters.tipos.toUpperCase())
        }
        if (filters.search !== '') {
            // eslint-disable-next-line eqeqeq
            filteredData = filteredData.filter(el => el.name.includes(filters.search))
        }
        setData(filteredData.slice(0, displayCount))
    }, [allItems, filters, displayCount])

    return { data, filters, loadMoreData, handleFilters }
}