'use client'
import React from 'react'
import epic from '../assets/epicLogo.svg'
import xbox from '../assets/xboxLogo.svg'
import ps5 from '../assets/ps5Logo.svg'
import useSearch from '../hooks/useSearch'


const Search = () => {
    const logos = [
        { name: 'xbl', src: xbox.src },
        { name: 'epic', src: epic.src },
        { name: 'psn', src: ps5.src }
    ]
    const { handleSubmit, stats, setStats } = useSearch()

    let isEmpty = stats.user === '' && stats.type === ''
    return (
        <form className='w-full' onSubmit={e => handleSubmit({ e: e })}>
            <div className='flex justify-between gap-4 my-4'>
                <input type='search' className=' rounded-md pl-2 py-2 outline-none text-gray-500 md:w-full' placeholder={stats.user || 'lilRauw5505'} onChange={(e) => setStats({ ...stats, user: e.target.value })} value={stats.user} />
                <button type='submit' disabled={isEmpty} className={` text-bg-header w-full md:w-28 rounded-md font-bold ${isEmpty ? 'bg-gray-500' : 'bg-yellowForrnite active:scale-95 cursor-pointer'} transition-transform ease-out duration-200`}>Buscar</button>
            </div>
            <div className='flex justify-between items-center gap-4 mt-2 w-[50%] m-auto'>
                {logos.map(logo => (
                    <img className={`${stats.type === logo.name ? 'shadow-lg bg-yellow-600' : ''} rounded-full cursor-pointer hover:bg-yellow-600 hover:shadow-lg transition-all ease-in-out duration-200 flex`} src={logo.src} key={logo.name} alt={`${logo.name}_icon`} onClick={() => setStats({ ...stats, type: logo.name })} />
                ))}
            </div>
            {(stats.isEmpty && stats.user.trim() === '' && stats.type.trim() === '') && <div>No Seleccionado nada Noob 😒, has de ser Bronce</div>}
            {(stats.user.trim() === '' && stats.isEmpty) && <div className='text-red-400'>Debes escribir tu usuario</div>}
            {(stats.type.trim() === '' && stats.isEmpty) && <div className='text-red-400'>Debes seleccionar tu plataforma</div>}
            {(stats.user.trim().length === 0 && stats.isEmpty) && <div className='text-red-400'>Has ingresado espacios en blanco</div>}
        </form>
    )
}

export default Search