interface CustomStyle extends React.CSSProperties {
    '--progress-width'?: string;
}

export const AnimatedBar = ({ color, data, height, zIndex }: { color: string, data: number, height: number, zIndex: number }) => {
    // @ts-ignore
    // console.log({ color, zIndex })
    const barStyle: CustomStyle = {
        '--progress-width': `${data}%`,
        height: height,
        top: `0`,
        zIndex: zIndex
    };
    return (
        <div className={`${color}  rounded-full absolute progress-bar-animated progress-bar`} style={barStyle}></div>
    )
}
