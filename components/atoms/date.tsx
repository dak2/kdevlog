import { parseISO, format } from 'date-fns';

export function FormatedDate({ dateString }) {
  const date = parseISO(dateString);
  return (
    <p suppressHydrationWarning>updated_at: {format(date, 'yyyy-MM-dd')}</p>
  );
}

export function FormatedToday({ date }) {
  return (
    <p suppressHydrationWarning id="copyright" className="inline-block text-xs">
      {`© ${format(date, 'yyyy')} Kdevlog.com`}
    </p>
  );
}
