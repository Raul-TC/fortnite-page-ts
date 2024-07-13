import Link from 'next/link';

interface PaginationNumberProps {
    page: number | string;
    href: string;
    isActive: boolean;
    position: string;
}

export const PaginationNumber = ({ page, href, isActive, position }: PaginationNumberProps) => {
    const className = `flex h-10 w-10 items-center justify-center text-sm border 
    ${position === 'first' || position === 'single' ? 'rounded-l-md' : ''} 
    ${position === 'last' || position === 'single' ? 'rounded-r-md' : ''} 
    ${isActive ? 'z-10 bg-yellowForrnite border-yellow-600 text-black' : ''} 
    ${!isActive && position !== 'middle' ? 'hover:bg-yellow-700' : ''} 
    ${position === 'middle' ? 'text-yellow-700' : ''}`;

    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className} scroll={false}>
            {page}
        </Link>
    );
}
