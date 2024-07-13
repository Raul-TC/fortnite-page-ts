import { useCallback, useMemo } from "react";
import { generatePagination } from "../utils/utils";

export function useAllPages({ currentPage, totalPages, searchParams, pathname }: { currentPage: number, totalPages: number, searchParams: URLSearchParams, pathname: string }) {
    const allPages = useMemo(() => generatePagination({ currentPage, totalPages }), [currentPage, totalPages])

    const createPageURL = useCallback((page: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        return `${pathname}?${params.toString()}`
    }, [pathname, searchParams])

    return { allPages, createPageURL }

}