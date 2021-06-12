import { FormatedToday } from './Date';

const Footer = () => {
  return (
    <div className="mt-12 text-gray-500 dark:text-gray-200">
      <FormatedToday date={new Date()} />
    </div>
  );
};

export default Footer;
