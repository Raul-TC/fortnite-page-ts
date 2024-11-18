import React from 'react'

export const StatsDashboard = ({ icon, text, stat }: { icon: string, text: string, stat: number | string }) => {
    return (
        <div className='pl-3 text-gray-400 flex gap-1 items-center justify-center'>
            <img src={icon} alt={`${text}`} className='w-4 h-4' />
            <p>{text}<span className='text-white'> {stat}</span></p>
        </div>)
}
