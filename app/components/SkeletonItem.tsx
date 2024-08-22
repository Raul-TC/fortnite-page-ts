const SkeletonItem = () => {
    return (
        <div>

            <div className='w-28 h-28 animate-pulse bg-gray-400 rounded-full m-auto mb-1' />
            <div className='animate-pulse bg-gray-400 w-full h-10 m-auto rounded-md my-4' />

            <div className='flex flex-col items-center m-auto w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)] mb-16'>

                <div className='grid grid-cols-1 items-center justify-between w-full rounded-md md:grid-cols-2 h-full'>
                    <div className='w-full rounded-md flex items-center justify-center'>
                        <div className='h-[25.438rem] w-[25.438rem]  animate-pulse bg-gray-400 rounded-md' />
                    </div>

                    <div className='w-full flex justify-around flex-col items-center gap-4 md:self-start md:pl-32 pt-4'>
                        <div className='animate-pulse bg-gray-400 h-6 w-64 rounded-md self-start' />
                        <div className='animate-pulse bg-gray-400 h-6 w-64 rounded-md self-start' />
                        <div className='animate-pulse bg-gray-400 h-6 w-64 rounded-md self-start' />
                        <div className='animate-pulse bg-gray-400 h-6 w-64 rounded-md self-start' />

                        <div className='flex flex-col h-full w-full justify-center items-center m-auto gap-4'>
                            <div className=' animate-pulse bg-gray-400 h-9 w-64 rounded-md' />
                            <div className='animate-pulse bg-gray-400 h-6 w-64 rounded-md' />
                            <div className='animate-pulse bg-gray-400 h-6 w-64 rounded-md' />
                            <div className='animate-pulse bg-gray-400 h-6 w-64 rounded-md' />

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default SkeletonItem