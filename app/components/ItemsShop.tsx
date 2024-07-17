import { DisplayAsset } from "../api/shop"
import { SectionShop } from "./SectionShop"
import { getShop } from "../services/fetchData"
import CurrentDay from "./CurrentDay"

const ItemsShop = async () => {
    const { shop } = await getShop()

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
    return (
        <>
            {sortedItems && sortedItems.map((el, sectionIndex) => {
                return <SectionShop key={`${el.section}_${sectionIndex}`} el={el} />
            })}
        </>
    )
}

export default ItemsShop