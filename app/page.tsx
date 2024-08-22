import { Suspense } from "react";
import { getBattlePass } from "./services/fetchData";
import SkeletonHome from "./components/SkeletonHome";
import Pagination from "./components/Pagination";
import BattlePass from "./components/BattlePass";
import { randomUUID } from "crypto";

export const metadata = {
  title: 'Pase de Batalla',
  description: 'Pase de Batalla Actual de Fortnite',
  icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
  facebook: {
    card: '',
    title: 'Tienda de HOY Fortnite',
    description: 'Tienda Actualizada de la tienda de fortnite'
  }
}
export const dynamic = 'force-dynamic'

interface HomeProps {
  searchParams: {
    page?: string,
    currentPage?: number
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const { arr, info, seasonDates, videos } = await getBattlePass()
  const currentPage = Number(searchParams.page || 1)
  const totalPages = arr.length

  return (
    <>
      <Suspense key={crypto.randomUUID()} fallback={<SkeletonHome />}>
        <BattlePass currentPage={currentPage} arr={arr} info={info} seasonDates={seasonDates} videos={videos} />
        <Pagination totalPages={totalPages} />
      </Suspense>

    </>


  )
}
