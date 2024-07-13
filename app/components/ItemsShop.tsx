import { DisplayAsset } from "../api/shop"
import { SectionShop } from "./SectionShop"
import { getShop } from "../services/fetchData"
import { useFormatedEndDate } from "../hooks/useFormatedEndDate"
import { useFormatedDate } from "../hooks/useFormatedDate"
import { useGetDay } from "../hooks/useGetDays"

const ItemsShop = async () => {
    const { shop, lastUpdated } = await getShop()

    let lastShop = new Date(lastUpdated.date)
    const filterItemsByBackground = ({ arrayObjects }: { arrayObjects: DisplayAsset[] }) => {
        const seenBackgrounds = new Set();
        return arrayObjects.filter(item => {
            if (seenBackgrounds.has(item.background)) {
                return false;
            } else {
                seenBackgrounds.add(item.background);
                return true;
            }
        });
    };

    shop.forEach(item => {
        item.data.forEach(el => {
            if (el.displayAssets) {
                el.displayAssets = filterItemsByBackground({ arrayObjects: el.displayAssets })
            }
        })

    });

    const keywords = ["Lote", "LOTE", "PAQUETE", "Pack", "Lotes"];

    const sortedItems = shop.map(el => {
        const sorted = (el.data.sort((a, b) => {
            // Verifica si 'a' contiene alguna de las palabras clave en su descripción
            const aContainsKeyword = keywords.some(keyword => a.displayName.includes(keyword));

            // Verifica si 'b' contiene alguna de las palabras clave en su descripción
            const bContainsKeyword = keywords.some(keyword => b.displayName.includes(keyword));

            // Si 'a' contiene una palabra clave y 'b' no, 'a' debe ir antes que 'b'
            if (aContainsKeyword && !bContainsKeyword) {
                return -1;
            }

            // Si 'b' contiene una palabra clave y 'a' no, 'b' debe ir antes que 'a'
            if (!aContainsKeyword && bContainsKeyword) {
                return 1;
            }

            // Si ambos contienen o no contienen palabras clave, mantener el orden actual
            return 0;
        })

        )
        return { ...el, data: sorted }
    })
    // console.log(sortedItems)
    // console.log(shop)
    // Estado para controlar el número de elementos visibles por sección
    // const [visibleItems, setVisibleItems] = useState(shop.map(() => 6)); // Mostrar inicialmente 10 elementos por sección

    // // Función para mostrar más elementos en una sección específica
    // const showMoreItems = (sectionIndex) => {
    //     setVisibleItems(prevState => {
    //         const newVisibleItems = [...prevState];
    //         newVisibleItems[sectionIndex] += 10; // Aumentar el número de elementos visibles en 10
    //         return newVisibleItems;
    //     });
    // };

    // const test = shop.map(() => 6)
    return (
        //     <>
        //         {shop && shop.map((el, index) => (
        //             <section key={`${index}_${el.section}`} id={`${el.section}`} className='pb-4 w-full h-full'>
        //                 <h2 className={`${luckiestGuy.className} text-2xl text-center font-bold mt-4 mb-4 md:text-3xl `}>{el.section}</h2>
        //                 <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3  h-full w-full'>
        //                     {el.data.map((child, index) => {
        //                         if (child.displayAssets.length > 1) {
        //                         } return (child.displayAssets.length > 0 && (
        //                             <Link
        //                                 key={`${index}_${child.mainId}`}
        //                                 href={`/cosmetics/${child.mainId}`}
        //                                 className={`${child.displayName.includes('Lote') || child.displayName.includes('LOTE') || child.displayName.includes('PAQUETE') || child.displayName.includes('Pack') || el.section.includes('Lotes') ? 'col-span-2 row-span-2 order-[-1] ' : 'text-xs'} rounded-md overflow-hidden self-start cursor-pointer w-full `}
        //                             >

        //                                 {child.displayAssets.length > 1
        //                                     ? (
        //                                         <div className='flex w-full h-full overflow-hidden rounded-md flex-col items-center justify-center '>
        //                                             <div className='relative top-0 bottom-0 h-full w-full overflow-hidden z-0'>

        //                                                 <ImageSlider
        //                                                     key={`${index}_${child.mainId}`}
        //                                                     displayName={child.displayName}
        //                                                     arrayImages={child.displayAssets}
        //                                                     price={child.price.regularPrice}
        //                                                     isItem={false}
        //                                                     bg={child.bg ?? child.bgDefault}
        //                                                 />

        //                                             </div>
        //                                         </div>
        //                                     )

        //                                     : (
        //                                         <div className='relative w-full h-full rounded-md' key={child.displayName}>

        //                                             {/* <Image
        //                                             src={child.displayAssets[0].background}
        //                                             alt={`image_${child.displayName}`}
        //                                             width={300}
        //                                             height={300}
        //                                             className='w-full h-full rounded-md'
        //                                             quality={70} /> */}
        //                                             {child.bg !== ''
        //                                                 ? (
        //                                                     <>
        //                                                         <Image src={child.displayAssets[0].url} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0 z-10' width={200} height={200} quality={50} />
        //                                                         {/* <img src={child.displayAssets[0].url} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0 z-10' /> */}
        //                                                         {/* <img src={child.bg} alt='' className='absolute top-0 bottom-0 left-0 right-0 z-0' /> */}
        //                                                         <Image src={child.bg} alt='' className='absolute top-0 bottom-0 left-0 right-0 z-0 w-full' width={400} height={400} quality={50} />

        //                                                     </>
        //                                                 )
        //                                                 // : <img src={child.displayAssets[0].background} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0' />}
        //                                                 : <Image src={child.displayAssets[0].background} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0' width={200} height={200} quality={50} />}

        //                                             <BackgroundCard displayName={child.displayName} price={child.price.regularPrice} isFree='false' page="" />
        //                                         </div>
        //                                     )}
        //                             </Link>
        //                         )
        //                         )
        //                     })}
        //                 </div>
        //             </section>
        //         ))}
        //     </>
        // <>
        //     {shop && shop.map((el, sectionIndex) => {
        //         console.log('se actualio el item', sectionIndex)
        //         return (
        //             <section key={`${sectionIndex}_${el.section}`} id={`${el.section}`} className='pb-4 w-full h-full'>
        //                 <h2 className={`${luckiestGuy.className} text-2xl text-center font-bold mt-4 mb-4 md:text-3xl `}>{el.section}</h2>
        //                 <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 h-full w-full'>
        //                     {el.data.slice(0, visibleItems[sectionIndex]).map((child, index) => (
        //                         <Link
        //                             key={`${index}_${child.mainId}`}
        //                             href={`/cosmetics/${child.mainId}`}
        //                             className={`${child.displayName.includes('Lote') || child.displayName.includes('LOTE') || child.displayName.includes('PAQUETE') || child.displayName.includes('Pack') || el.section.includes('Lotes') ? 'col-span-2 row-span-2 order-[-1] ' : 'text-xs'} rounded-md overflow-hidden self-start cursor-pointer w-full `}
        //                         >
        //                             {child.displayAssets.length > 1 ? (
        //                                 <div className='flex w-full h-full overflow-hidden rounded-md flex-col items-center justify-center '>
        //                                     <div className='relative top-0 bottom-0 h-full w-full overflow-hidden z-0'>
        //                                         <ImageSlider
        //                                             key={`${index}_${child.mainId}`}
        //                                             displayName={child.displayName}
        //                                             arrayImages={child.displayAssets}
        //                                             price={child.price.regularPrice}
        //                                             isItem={false}
        //                                             bg={child.bg ?? child.bgDefault}
        //                                         />
        //                                     </div>
        //                                 </div>
        //                             ) : (
        //                                 <div className='relative w-full h-full rounded-md' key={child.displayName}>
        //                                     {child.bg !== '' ? (
        //                                         <>
        //                                             <Image src={child.displayAssets[0].url} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0 z-10' width={200} height={200} quality={50} />
        //                                             <Image src={child.bg} alt='' className='absolute top-0 bottom-0 left-0 right-0 z-0' width={200} height={200} quality={50} />
        //                                         </>
        //                                     ) : (
        //                                         <Image src={child.displayAssets[0].background} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0' width={200} height={200} quality={50} />
        //                                     )}
        //                                     <BackgroundCard displayName={child.displayName} price={child.price.regularPrice} isFree='false' />
        //                                 </div>
        //                             )}
        //                         </Link>
        //                     ))}
        //                 </div>
        //                 {visibleItems[sectionIndex] < el.data.length && (
        //                     <div className='text-center mt-4'>
        //                         <button onClick={() => showMoreItems(sectionIndex)} className='bg-blue-500 text-white py-2 px-4 rounded'>
        //                             Ver más
        //                         </button>
        //                     </div>
        //                 )}
        //             </section>
        //         )
        //     })}

        // </>
        <>
            <h1 className="text-xl font-bold">Ultima actualizacion: {lastShop.toLocaleString()}</h1>

            {sortedItems && sortedItems.map((el, sectionIndex) => {
                return <SectionShop key={`${el.section}_${sectionIndex}`} el={el} />
            })}
        </>
    )
}

export default ItemsShop