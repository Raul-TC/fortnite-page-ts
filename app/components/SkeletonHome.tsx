const SkeletonHome = () => {
    return (
        <>
            <div className='m-auto w-60 h-8 animate-pulse bg-gray-500 rounded-md mb-2' />
            <div className='flex flex-col gap-4 self-start items-center justify-center w-full rounded-md top-0 left-0 right-0'>

                <div className='m-auto w-52 h-6 animate-pulse bg-gray-500 rounded-md' />
                <div className='m-auto w-8 h-4 animate-pulse bg-gray-500 rounded-md' />
                <div className='m-auto w-44 h-8 animate-pulse bg-gray-500 rounded-md' />

            </div>

            <div className=' flex items-center justify-between w-full h-[170px]  md:h-screen max-h-[810px] my-2'>
                <div
                    className='relative left-0 right-0 top-0 bottom-0 h-full z-10 w-full bg-slate-500 animate-pulse rounded-md'
                />
            </div>

            <div className='m-auto w-52 h-6 animate-pulse bg-gray-500 rounded-md my-4' />
            <div className='m-auto w-20 h-6 animate-pulse bg-gray-500 rounded-md my-6' />

            <div className='grid grid-cols-2 md:grid-cols-6  h-full w-full justify-center items-center m-auto gap-2'>
                <div className='animate-pulse bg-gray-400 h-36 w-36 rounded-md m-auto' />
                <div className='animate-pulse bg-gray-400 h-36 w-36 rounded-md m-auto' />
                <div className='animate-pulse bg-gray-400 h-36 w-36 rounded-md m-auto' />
                <div className='animate-pulse bg-gray-400 h-36 w-36 rounded-md m-auto' />
                <div className='animate-pulse bg-gray-400 h-36 w-36 rounded-md m-auto' />
                <div className='animate-pulse bg-gray-400 h-36 w-36 rounded-md m-auto' />

            </div>

            <div className='flex justify-between gap-[2px] w-[330px] md:w-[347px] mt-4 m-auto'>
                <div className='w-5 h-5 animate-pulse bg-gray-400 rounded-md mr-2' />
                <div className='w-5 h-5 animate-pulse bg-gray-400 rounded-md' />
                <div className='w-5 h-5 animate-pulse bg-gray-400 rounded-md' />
                <div className='w-5 h-5 animate-pulse bg-gray-400 rounded-md' />
                <div className='w-5 h-5 animate-pulse bg-gray-400 rounded-md' />
                <div className='w-5 h-5 animate-pulse bg-gray-400 rounded-md' />
                <div className='w-5 h-5 animate-pulse bg-gray-400 rounded-md' />
                <div className='w-5 h-5 animate-pulse bg-gray-400 rounded-md ml-2' />
            </div>
        </>
    )
}

export default SkeletonHome