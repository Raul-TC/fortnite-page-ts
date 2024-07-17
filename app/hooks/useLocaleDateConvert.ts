import { useMemo } from "react";

export default function useLocaleDateConvert() {
    const handleLocalDate = useMemo(() => ({ fecha, onlyDate }: { fecha: string | Date, onlyDate?: boolean }) => {
        if (!fecha) return
        const date = new Date(fecha.toString().includes('T') ? fecha : `${fecha}T00:00:00Z`)
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'America/Monterrey'
        }
        const optionsOnlyDate: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            timeZone: 'America/Monterrey'
        }
        const formatter = new Intl.DateTimeFormat('es-MX', onlyDate ? optionsOnlyDate : options);

        const parts = formatter.formatToParts(date);

        const day = parts.find(part => part.type === 'day')?.value ?? '';
        const month = parts.find(part => part.type === 'month')?.value ?? '';
        const year = parts.find(part => part.type === 'year')?.value ?? '';
        const weekday = parts.find(part => part.type === 'weekday')?.value ?? '';
        const hour = parts.find(part => part.type === 'hour')?.value ?? '';
        const minute = parts.find(part => part.type === 'minute')?.value ?? '';
        const second = parts.find(part => part.type === 'second')?.value ?? '';
        const dayPeriod = parts.find(part => part.type === 'dayPeriod')?.value ?? '';

        const capitalizedWeekday = weekday?.charAt(0).toUpperCase() + weekday?.slice(1);
        return onlyDate ? `${day} ${month} ${year}` : `${capitalizedWeekday} ${day} ${month} ${year}, ${hour}:${minute}:${second} ${dayPeriod.replace(/\.\s/g, '.')}`
    }, [])

    return { handleLocalDate }
}