const SkeletonStats = () => {
    return (
        <div className='flex gap-4 items-center flex-col mt-4  m-auto'>
            <div className='animate-pulse bg-gray-400 h-[36px] w-[50%] md:w-[20%] rounded-md'> </div>
            <div className='animate-pulse bg-gray-400 h-[36px] w-[80%] md:w-[30%] rounded-md'> </div>
            <div className='flex flex-row w-full items-center py-4 justify-between gap-4 flex-wrap self-start min-h-[259px] bg-gray-400 animate-pulse rounded-md'>

                <div className='flex gap-4 self-start mx-4 flex-wrap'>
                    <span className='w-56 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                    <span className='w-52 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                </div>

                <div className='w-full flex justify-between gap-4 mx-4 flex-wrap'>
                    <span className='w-32 h-20 animate-pulse bg-gray-200 rounded-md'></span>
                    <span className='w-32 h-20 animate-pulse bg-gray-200 rounded-md'></span>
                    <span className='w-32 h-20 animate-pulse bg-gray-200 rounded-md'></span>
                    <span className='w-32 h-20 animate-pulse bg-gray-200 rounded-md'></span>
                </div>
                <div className='flex flex-col gap-2 self-start mx-4 w-full'>
                    <div className='flex w-full gap-2 flex-wrap'>
                        <span className='w-28 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                        <span className='w-28 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                        <span className='w-28 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                        <span className='w-28 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                        <span className='w-28 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                    </div>
                    <div className='rounded-full w-full bg-gray-200 h-14 animate-pulse'></div>

                    <div className='flex justify-between'>
                        <span className='w-32 h-9 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-24 h-9 bg-gray-200 animate-pulse rounded-md'></span>
                    </div>
                </div>
            </div>

            <div className='flex flex-row w-full items-center py-4 justify-between gap-4 flex-wrap self-start min-h-[259px] bg-gray-400 animate-pulse rounded-md'>

                <div className='flex gap-4 self-start mx-4 flex-wrap'>
                    <span className='w-56 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                    <span className='w-52 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                </div>

                <div className='w-full flex justify-between gap-4 mx-4 flex-wrap'>
                    <span className='w-32 h-20 animate-pulse bg-gray-200 rounded-md'></span>
                    <span className='w-32 h-20 animate-pulse bg-gray-200 rounded-md'></span>
                    <span className='w-32 h-20 animate-pulse bg-gray-200 rounded-md'></span>
                    <span className='w-32 h-20 animate-pulse bg-gray-200 rounded-md'></span>
                </div>
                <div className='flex flex-col gap-2 self-start mx-4 w-full'>
                    <div className='flex w-full gap-2 flex-wrap'>
                        <span className='w-28 h-5 animate-pulse bg-gray-200 rounded-md'></span>
                        <span className='w-28 h-5 animate-pulse bg-gray-200 rounded-md'></span>

                    </div>
                    <div className='rounded-full w-full bg-gray-200 h-14 animate-pulse m-auto'></div>

                    <div className='flex justify-between flex-wrap gap-4'>
                        <span className='w-14 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-14 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-24 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-14 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-14 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-14 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-24 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-14 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-24 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                        <span className='w-24 h-6 bg-gray-200 animate-pulse rounded-md'></span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SkeletonStats