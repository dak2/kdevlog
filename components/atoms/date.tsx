import { format, parseISO } from 'date-fns'

export function FormatedDate({ dateString, type = 'updated_at' }) {
  const date = parseISO(dateString)
  return `${type}: ${format(date, 'yyyy-MM-dd')}`
}

export function FormatedToday({ date }) {
  return (
    <p suppressHydrationWarning id="copyright" className="inline-block text-xs">
      {`© ${format(date, 'yyyy')} Kdevlog.com`}
    </p>
  )
}
