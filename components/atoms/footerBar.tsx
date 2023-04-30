import { FormatedToday } from './date';

const Footer = () => {
  return (
    <div id="footer" className="mt-12 text-gray-200">
      <FormatedToday date={new Date()} />
    </div>
  );
};

export default Footer;
