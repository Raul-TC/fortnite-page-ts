// eslint-disable-next-line camelcase
import { Montserrat, Luckiest_Guy, Balsamiq_Sans } from 'next/font/google'

export const montserrat = Montserrat({
    weight: ['400', '800'],
    subsets: ['latin']
})

export const luckiestGuy = Luckiest_Guy({
    subsets: ['latin'],
    weight: ['400']
})
export const balsamiqSans = Balsamiq_Sans({
    subsets: ['latin'],
    weight: ['400', '700']
})