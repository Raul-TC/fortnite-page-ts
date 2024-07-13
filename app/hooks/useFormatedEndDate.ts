import { useMemo } from "react";
import { useFormatedDate } from "./useFormatedDate";

export function useFormatedEndDate({ dateProp }: { dateProp: Date | string }) {

    const { formatedDate } = useFormatedDate();

    const dateFormated = useMemo(() => {
        if (!dateProp) return 'Cargando..'
        const [date] = new Date(dateProp).toISOString().split('T');
        return formatedDate({ date: date });
    }, [dateProp, formatedDate]);

    return { dateFormated };

}
