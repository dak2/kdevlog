import { parseISO, format } from 'date-fns'

export function FormatedCreatedAt({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'yyyy-MM-dd')}</time>
}

export function FormatedToday({ date }) {
  return <time dateTime={date}>{format(date, 'yyyy')}</time>
}
