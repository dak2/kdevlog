import { FormatedToday } from './date';

const Footer = () => {
  return (
    <div className="mt-12">
      <FormatedToday date={new Date()} />
    </div>
  );
};

export default Footer;
