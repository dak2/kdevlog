import Link from 'next/link';
import { PER_PAGE } from '../../lib/const';
import GenericIcon from '../atoms/genericIcon';
import { useRouter } from 'next/router';
import { range } from '../../utils/functions';

const Pagination = ({ totalCount }) => {
  const router = useRouter();
  const currentPageId = router.query.id ? Number(router.query.id) : '';
  const prevPageId = currentPageId ? currentPageId - 1 : '';
  const nextPageId = currentPageId ? currentPageId + 1 : '';
  const pagenationList = range(1, Math.ceil(totalCount / PER_PAGE));

  const prevPage = () => {
    if (pagenationList.length <= 1) {
      return (
        <div id="prev-page-icon" style={{ marginTop: 5 }}>
          <GenericIcon iconName="left" />
        </div>
      );
    } else {
      return (
        <a
          id="prev-page-icon"
          href={`/posts/page/${prevPageId}`}
          style={{ marginTop: 5 }}
        >
          <GenericIcon iconName="left" />
        </a>
      );
    }
  };

  const nextPage = () => {
    if (pagenationList.length <= 1 || pagenationList.length === currentPageId) {
      return (
        <div id="next-page-icon" style={{ marginTop: 5 }}>
          <GenericIcon iconName="right" />
        </div>
      );
    } else {
      return (
        <a
          id="next-page-icon"
          href={`/posts/page/${nextPageId}`}
          style={{ marginTop: 5 }}
        >
          <GenericIcon iconName="right" />
        </a>
      );
    }
  };

  return (
    <div id="pagination" className="flex justify-start text-gray-200">
      {prevPage()}
      <ul>
        {pagenationList.map((number, index) => (
          <li
            id="page-number"
            key={index}
            className="inline-block w-6 text-center mx-1.5 hover:underline"
          >
            <Link href={`/posts/page/${number}`}>
              <p>{number}</p>
            </Link>
          </li>
        ))}
      </ul>
      {nextPage()}
    </div>
  );
};

export default Pagination;
