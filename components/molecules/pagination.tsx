import Link from 'next/link';
import { range, PER_PAGE } from '../../lib/const';
import Left from '../atoms/icons/Left';
import Right from '../atoms/icons/Right';
import { useRouter } from 'next/router';

const Pagination = ({ totalCount }) => {
  const router = useRouter();
  const currentPageId = router.query.id ? Number(router.query.id) : '';
  const prevPageId = currentPageId ? currentPageId - 1 : '';
  const nextPageId = currentPageId ? currentPageId + 1 : '';

  const prevPage = () => {
    if (currentPageId == 1) {
      return <Left />;
    } else {
      return (
        <a href={`/posts/page/${prevPageId}`}>
          <Left />
        </a>
      );
    }
  };

  const nextPage = () => {
    if (currentPageId == Math.ceil(totalCount / PER_PAGE)) {
      return <Right />;
    } else {
      return (
        <a href={`/posts/page/${nextPageId}`}>
          <Right />
        </a>
      );
    }
  };

  return (
    <div className="flex justify-start">
      {prevPage()}
      <ul>
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
          <li key={index} className="mx-1.5 w-6 text-center hover:underline">
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
