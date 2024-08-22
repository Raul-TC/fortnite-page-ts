import NavMenu from './NavMenu'
import Logo from './Logo'

const Header = () => {
    return (
        <>
            <header className='fixed z-50 top-0 bg-bg-header flex items-center justify-between text-white border-background-black min-h-[80px] w-full'>
                <div className='w-[95%] max-w-[1440px] m-auto flex justify-between items-center h-full'>
                    <Logo />
                    <NavMenu />
                </div>
            </header>
        </>

    )
}

export default Header