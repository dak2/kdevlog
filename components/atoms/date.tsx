import { parseISO, format } from 'date-fns';

export function FormatedDate({ dateString }) {
  const date = parseISO(dateString);
  return format(date, 'yyyy-MM-dd');
}

export function FormatedToday({ date }) {
  return (
    <p className="inline-block text-xs">
      {`© ${format(date, 'yyyy')} Kdevlog.com`}
    </p>
  );
}
