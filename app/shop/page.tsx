import { Suspense } from 'react'
import ItemsShop from '../components/ItemsShop'
import CountDown from '../components/CountDown'
import SkeletonCards from '../components/SkeletonCards'

export const metadata = {
    title: 'Tienda Fortnite HOY',
    description: 'Tienda Actual de Fortnite',
    icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
    facebook: {
        card: '',
        title: 'Tienda de HOY Fortnite',
        description: 'Tienda Actualizada de la tienda de fortnite'
    }
}
export const dynamic = 'force-dynamic'

export default async function Home() {
    return (
        <Suspense fallback={<SkeletonCards />}>
            <CountDown isShop date="false" message='Cargando Contador⌛' />
            <ItemsShop />
        </Suspense>
    )
}
