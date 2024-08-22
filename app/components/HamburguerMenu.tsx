interface HamburguerMenuProps {
    state: boolean,
    handleToggle: () => void
}
const HamburguerMenu = ({ state, handleToggle }: HamburguerMenuProps) => {
    return (
        <button className={`hamburger hamburger--spring ${state ? 'is-active' : ''} md:hidden z-[99]`} type='button' onClick={handleToggle}>
            <span className='hamburger-box'>
                <span className='hamburger-inner' />
            </span>
        </button>
    )
}

export default HamburguerMenu