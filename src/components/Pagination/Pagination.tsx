import { ResponseInfo } from '@/types/shared/types';
import { Link } from '@/i18n/routing';
import './Pagination.css';

interface PaginationProps {
  infoData: ResponseInfo;
  currentPage: number;
  searchParams: {
    page?: string;
    query?: string;
    q?: string;
    id?: string;
  };
}

export const Pagination = (props: PaginationProps) => {
  const { infoData, currentPage, searchParams } = props;
  const totalPages = infoData.pages || 0;

  if (!totalPages) return null;

  const createPageHref = (pageNumber: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    params.set('page', String(pageNumber));

    return `/?${params.toString()}`;
  };

  return (
    <div className="pagination">
      {totalPages > 3 &&
        (currentPage <= 1 ? (
          <span className="pagination__page-btn disabled">&laquo;</span>
        ) : (
          <Link href={createPageHref(1)} className="pagination__page-btn">
            &laquo;
          </Link>
        ))}

      {totalPages > 3 &&
        (currentPage <= 1 ? (
          <span className="pagination__page-btn disabled">&lsaquo;</span>
        ) : (
          <Link
            href={createPageHref(currentPage - 1)}
            className="pagination__page-btn"
          >
            &lsaquo;
          </Link>
        ))}

      {totalPages > 3 && currentPage > 2 && (
        <span className="pagination__page-btn disabled">...</span>
      )}

      {currentPage > 1 && (
        <Link
          href={createPageHref(currentPage - 1)}
          className="pagination__page-btn"
        >
          {currentPage - 1}
        </Link>
      )}

      <span className="pagination__page-btn--active">{currentPage}</span>

      {currentPage + 1 <= totalPages && (
        <Link
          href={createPageHref(currentPage + 1)}
          className="pagination__page-btn"
        >
          {currentPage + 1}
        </Link>
      )}

      {totalPages > 3 && currentPage < totalPages - 1 && (
        <span className="pagination__page-btn disabled">...</span>
      )}

      {totalPages > 3 &&
        (currentPage >= totalPages ? (
          <span className="pagination__page-btn disabled">&rsaquo;</span>
        ) : (
          <Link
            href={createPageHref(currentPage + 1)}
            className="pagination__page-btn"
          >
            &rsaquo;
          </Link>
        ))}

      {totalPages > 3 &&
        (currentPage >= totalPages ? (
          <span className="pagination__page-btn disabled">&raquo;</span>
        ) : (
          <Link
            href={createPageHref(totalPages)}
            className="pagination__page-btn"
          >
            &raquo;
          </Link>
        ))}
    </div>
  );
};
