import { parseISO, format } from 'date-fns';

export function FormatedDate({ dateString }) {
  const date = parseISO(dateString);
  return <p>{format(date, 'yyyy-MM-dd')}</p>;
}

export function FormatedToday({ date }) {
  return (
    <p className="inline-block text-xs">
      {`© ${format(date, 'yyyy')} Kdevlog.com`}
    </p>
  );
}
