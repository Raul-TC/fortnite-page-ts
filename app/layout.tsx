import "./globals.css";
import './hamburguer.css'

import Header from "./components/Header";

import { balsamiqSans } from './assets/fonts'
import Link from "next/link";


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${balsamiqSans.className} bg-bg-body text-white pb-[80px]`}>
        <Header />
        <div className='w-[95%] max-w-[1440px] m-auto  mt-[100px] md:min-h-[95vh]'>
          {children}
        </div>
        <footer className='w-full text-center fixed bottom-0 h-[40px] mt-[50px] bg-bg-header flex items-center justify-center z-[50] gap-1'>Made by  <Link href='https://github.com/Raul-TC' className='text-red-400'>Raul-TC 💖</Link> </footer>

      </body>
    </html>
  );
}
