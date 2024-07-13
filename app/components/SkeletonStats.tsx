import React from 'react'

const SkeletonStats = () => {
    return (
        <div className='flex gap-4 items-center flex-col mt-4  m-auto'>
            <div className='animate-pulse bg-gray-400 h-[36px] w-[50%] md:w-[20%] rounded-md'> </div>
            <div className='animate-pulse bg-gray-400 h-[36px] w-[80%] md:w-[30%] rounded-md'> </div>
            <div className='flex w-full items-center justify-between flex-wrap self-start gap-4'>

                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
            <div className='animate-pulse bg-gray-400 h-[36px] w-[30%] rounded-md'> </div>
            <div className='flex w-full flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4 rounded-md'>

                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    )
}

const CardSkeleton = () => (
    <div className='relative m-auto w-[98%] md:w-[432px] h-[342px] animate-pulse bg-gray-400 flex flex-col gap-4 rounded-md'>
        <div className='animate-pulse h-[16px] w-[40%] bg-gray-200 ml-3 rounded-md mt-4' />
        <div className='animate-pulse h-[16px] w-[40%] bg-gray-200 ml-3 rounded-md' />
        <div className='animate-pulse h-[16px] w-[40%] bg-gray-200 ml-3 rounded-md' />
        <div className='animate-pulse h-[16px] w-[40%] bg-gray-200 ml-3 rounded-md' />
        <div className='animate-pulse h-[16px] w-[40%] bg-gray-200 ml-3 rounded-md' />
        <div className='animate-pulse h-[16px] w-[40%] bg-gray-200 ml-3 rounded-md' />
        <div className='animate-pulse h-[16px] w-[40%] bg-gray-200 ml-3 rounded-md' />
        <div className='animate-pulse h-[16px] w-[40%] bg-gray-200 ml-3 rounded-md' />
        <div className='animate-pulse h-[16px] w-[60%] bg-gray-200 ml-3 rounded-md' />
        <div className=' absolute bottom-0 animate-pulse w-full bg-gray-500 h-[44px] flex items-center justify-center'>
            <div className='animate-pulse w-[30%] h-[24px] bg-gray-200 rounded-md' />
        </div>
    </div>)

export default SkeletonStats