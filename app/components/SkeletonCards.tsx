const Skeleton = () => {
    return (
        <>
            <div className='m-auto animate-pulse my-4 h-6 w-32 bg-gray-400 rounded-lg block' />
            <div className='text-center grid md:grid-cols-6 md:grid-rows-2 gap-2 grid-flow-dense flex-wrap'>

                {[...Array(9)].map((_, index) => (

                    <div key={index} className={`${index === 0 ? 'max-w-[474px] min-h-[342px] col-span-2 row-span-2' : 'max-w-[233px] max-h-[233px] row-span-1 col-span-1'} animate-pulse pb-4 flex flex-col justify-end items-start  bg-gray-400 rounded-lg flex-wrap w-full h-full mx-auto aspect-square`}>
                        <div className='w-[60%] rounded-md mb-4 h-4 bg-gray-200 block m-auto' />
                        <div className='w-[20%] rounded-md h-4 bg-gray-200 ml-2 block self-end mr-2' />
                    </div>

                ))}
            </div>
        </>
    )
}
const SkeletonCards = () => {
    return (
        <>
            <div className='m-auto animate-pulse my-4 h-6 w-48 bg-gray-400 rounded-lg block' />
            <div className='m-auto animate-pulse my-4 h-6 w-36 bg-gray-400 rounded-lg block mb-6' />

            {[...Array(3)].map((_, index) => (

                <Skeleton key={index * 2} />
            ))}

        </>
    )
}

export default SkeletonCards