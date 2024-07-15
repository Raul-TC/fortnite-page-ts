'use client'
import { useFormatedDate } from '../hooks/useFormatedDate'
import { useShowHistory } from '../hooks/useShowHistory'
import DateComponent from './DateComponent'

interface HistoryPrps {
    shopHistory: Date[]
}
const History = ({ shopHistory }: HistoryPrps) => {
    const { showHistory, handleShowHistory } = useShowHistory()
    const { formatedDate, getDays } = useFormatedDate()

    const reversedHistory = shopHistory?.toReversed()
    const firstDate = shopHistory && reversedHistory[0]
    const secondDate = shopHistory && reversedHistory[1]
    const thirthDate = shopHistory && reversedHistory[2]

    return (
        <div className='w-full'>
            {shopHistory && shopHistory.length >= 1 && <h1 className='text-center font-bold text-2xl md:text-3xl mb-4'>Apariciones en Tienda ({shopHistory.length})</h1>}
            {
                !shopHistory
                    ? null
                    : shopHistory.length > 1
                        ? (
                            <>
                                <div className={`flex flex-row w-full md:w-96 justify-center items-center flex-wrap m-auto text-center ${showHistory && reversedHistory.length >= 7 ? 'overflow-y-scroll h-48 scrollHistory' : ''} w-[260px]`}>
                                    {shopHistory.length > 2
                                        ? (
                                            <>
                                                <DateComponent fullDate={formatedDate({ date: firstDate })} dayss={getDays({ date: firstDate })} />
                                                <DateComponent fullDate={formatedDate({ date: secondDate })} dayss={getDays({ date: secondDate })} />
                                                <DateComponent fullDate={formatedDate({ date: thirthDate })} dayss={getDays({ date: thirthDate })} />
                                                {
                                                    showHistory && reversedHistory.slice(3).map((el, index) => <DateComponent key={index} fullDate={formatedDate({ date: el })} dayss={getDays({ date: el })} />)
                                                }
                                            </>
                                        )
                                        : (
                                            <>
                                                <DateComponent fullDate={formatedDate({ date: firstDate })} dayss={getDays({ date: firstDate })} />
                                                <DateComponent fullDate={formatedDate({ date: secondDate })} dayss={getDays({ date: secondDate })} />
                                            </>
                                        )}
                                </div>
                                {shopHistory?.length > 3 && <button className=' h-8 font-bold block mt-4 mb-4 rounded-md text-center m-auto md:text-2xl' onClick={handleShowHistory}>{showHistory ? 'Ocultar historial' : 'Ver todo el historial'}</button>}
                            </>
                        )
                        : (
                            <>
                                {Number(getDays({ date: firstDate })) < 1 && <h2 className='font bold text-center md:text-2xl'>Nuevo en Fortnite</h2>}
                                <DateComponent fullDate={formatedDate({ date: firstDate })} dayss={getDays({ date: firstDate })} />
                            </>
                        )
            }
        </div>
    )
}

export default History