import Link from 'next/link';
import { range, PER_PAGE } from '../../lib/const';
import GenericIcon from '../atoms/genericIcon';
import { useRouter } from 'next/router';

const Pagination = ({ totalCount }) => {
  const router = useRouter();
  const currentPageId = router.query.id ? Number(router.query.id) : '';
  const prevPageId = currentPageId ? currentPageId - 1 : '';
  const nextPageId = currentPageId ? currentPageId + 1 : '';
  const pagenationList = range(1, Math.ceil(totalCount / PER_PAGE));

  const prevPage = () => {
    if (pagenationList.length <= 1) {
      return <GenericIcon iconName='left' styleName='mt-1'/>;
    } else {
      return (
        <a href={`/posts/page/${prevPageId}`}>
          <GenericIcon iconName='left' styleName='mt-1'/>;
        </a>
      );
    }
  };

  const nextPage = () => {
    if (pagenationList.length <= 1 || pagenationList.length === currentPageId) {
      return <GenericIcon iconName='right' styleName='mt-1'/>;
    } else {
      return (
        <a href={`/posts/page/${nextPageId}`}>
          <GenericIcon iconName='right' styleName='mt-1'/>;
        </a>
      );
    }
  };

  return (
    <div className="flex justify-start text-gray-500 dark:text-gray-200">
      {prevPage()}
      <ul>
        {pagenationList.map((number, index) => (
          <li
            key={index}
            className="mx-1.5 w-6 inline-block text-center hover:underline"
          >
            <Link href={`/posts/page/${number}`}>
              <a>{number}</a>
            </Link>
          </li>
        ))}
      </ul>
      {nextPage()}
    </div>
  );
};

export default Pagination;
