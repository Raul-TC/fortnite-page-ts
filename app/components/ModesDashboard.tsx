import React from 'react'

export const ModesDashboard = ({ color, text, value }: { color: string, text: string, value: number }) => {
    return (
        <h4 className='text-lg '><span className={color}>{text}</span> {value}</h4>
    )
}
