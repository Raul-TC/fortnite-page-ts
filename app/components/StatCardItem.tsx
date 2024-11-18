import React from 'react'

export const StatCardItem = ({ icon, label, value }: { icon: string, label: string, value: number | string }) => (
    <div className='bg-gray-800 flex flex-row items-center justify-center gap-2 py-2 px-4 rounded-md'>
        <img src={icon} alt="" className='w-7 h-7' />
        <div className='text-center'>
            <p>{label}</p>
            <h3 className='text-4xl'>{value}</h3>
        </div>
    </div>
);