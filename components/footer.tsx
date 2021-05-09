import { FormatedToday } from './date';

const Footer = () => {
  return (
    <div className="mt-28">
      ©︎ <FormatedToday date={new Date()} /> kdevlog.com
    </div>
  );
};

export default Footer;
