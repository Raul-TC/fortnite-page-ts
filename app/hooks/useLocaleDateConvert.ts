export default function useLocaleDateConvert() {
    const handleLocalDate = ({ fecha, onlyDate }: { fecha: string | Date, onlyDate?: boolean }) => {
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
        return date.toLocaleString('es-MX', onlyDate ? optionsOnlyDate : options)
    }

    return { handleLocalDate }
}