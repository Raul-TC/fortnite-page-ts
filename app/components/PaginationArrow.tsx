import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationArrowProps {
    href: string;
    direction: 'left' | 'right';
    isDisabled: boolean;
}

export const PaginationArrow = ({ href, direction, isDisabled }: PaginationArrowProps) => {
    const className = `flex h-10 w-10 items-center justify-center rounded-md border 
    ${isDisabled ? 'pointer-events-none text-gray-300' : 'hover:bg-gray-100'} 
    ${direction === 'left' ? 'mr-2 md:mr-4' : 'ml-2 md:ml-4'}`;

    const icon = direction === 'left' ? <FaArrowLeft className='w-4' /> : <FaArrowRight className='w-4' />;

    return (
        !isDisabled && <Link className={className} href={href} scroll={false}>
            {icon}
        </Link>
    );
}
