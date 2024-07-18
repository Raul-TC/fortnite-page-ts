import React from 'react'

interface CustomStyle extends React.CSSProperties {
    '--progress-width'?: string;
}

export const AnimatedBar = ({ color, data, height, index }: { color: string, data: number, height: string, index: string }) => {
    // @ts-ignore
    const barStyle: CustomStyle = {
        '--progress-width': `${data}%`,
    };
    return (
        <div className={`${color} h-${height} rounded-full absolute z-${index} progress-bar-animated progress-bar`} style={barStyle}></div>
    )
}
