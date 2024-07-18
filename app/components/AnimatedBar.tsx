import React from 'react'

export const AnimatedBar = ({ color, data, height, index }: { color: string, data: number, height: string, index: string }) => {
    return (
        <div className={`bg-${color}-500 h-${height} rounded-full absolute z-${index} progress-bar-animated progress-bar`} style={{ '--progress-width': `${data}%` }}></div>
    )
}
