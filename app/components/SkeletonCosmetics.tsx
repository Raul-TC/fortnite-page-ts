const MainCosmetics = () => {
    return (
        <>
            <div className='m-auto animate-pulse my-4  rounded-lg block' />
            <div className='text-center grid md:grid-cols-6 grid-cols-2  gap-2 grid-flow-dense flex-wrap'>

                {[...Array(6)].map((_, index) => (

                    <div key={index} className=' min-[233px] min-h-[233px] row-span-1 col-span-1 animate-pulse pb-4 flex flex-col justify-end items-start  bg-gray-400 rounded-lg flex-wrap w-full h-full'>
                        <div className='w-[60%] rounded-md mb-4 h-4 bg-gray-200 block m-auto' />
                    </div>

                ))}
            </div>
        </>
    )
}
const SkeletonCosmetics = () => {
    return (
        <>
            <div className=' flex gap-4 justify-between items-center flex-wrap'>
                <div className='w-[50%] h-[40px] animate-pulse flex items-center justify-center bg-gray-400 rounded-md'>

                    <div className='w-[90%] h-[14px] animate-pulse block bg-gray-200 mr-2 rounded-md' />

                </div>

                <div className='w-[169px] h-[40px] animate-pulse flex items-center justify-center bg-gray-400 rounded-md'>
                    <div className='flex justify-between items-center'>

                        <div className='w-[112px] h-[24px] animate-pulse block bg-gray-200 mr-2 rounded-md' />
                        <span className='w-[24px] h-[24px] block bg-gray-200 rounded-md' />
                    </div>
                </div>
                <div className='w-[169px] h-[40px] animate-pulse flex items-center justify-center bg-gray-400 rounded-md'>
                    <div className='flex justify-between items-center'>

                        <div className='w-[112px] h-[24px] animate-pulse block bg-gray-200 mr-2 rounded-md' />
                        <span className='w-[24px] h-[24px] block bg-gray-200 rounded-md' />
                    </div>
                </div>
                <div className='w-[169px] h-[40px] animate-pulse flex items-center justify-center bg-gray-400 rounded-md'>
                    <div className='flex justify-between items-center'>

                        <div className='w-[112px] h-[24px] animate-pulse block bg-gray-200 mr-2 rounded-md' />
                        <span className='w-[24px] h-[24px] block bg-gray-200 rounded-md' />
                    </div>
                </div>
            </div>
            {[...Array(3)].map((_, index) => (

                <MainCosmetics key={index * 2} />
            ))}

        </>
    )
}
export default SkeletonCosmetics