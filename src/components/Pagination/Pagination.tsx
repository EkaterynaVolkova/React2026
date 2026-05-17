import type { ResponseInfo } from '@interfaces/shared/types';
import './Pagination.css';

interface PaginationProps {
  infoData: ResponseInfo;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export const Pagination = (props: PaginationProps) => {
  const { infoData, onPageChange, currentPage } = props;
  const totalPages = infoData.pages || 0;

  if (!totalPages) return null;

  return (
    <>
      <div className="pagination">
        {totalPages > 3 && (
          <button
            className="pagination__page-btn"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(1)}
          >
            &laquo;
          </button>
        )}

        {totalPages > 3 && (
          <button
            className="pagination__page-btn"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lsaquo;
          </button>
        )}

        {totalPages > 3 && currentPage > 2 && (
          <button className="pagination__page-btn" disabled>
            ...
          </button>
        )}

        {currentPage > 1 && (
          <button
            className="pagination__page-btn"
            onClick={() => onPageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}

        <button className="pagination__page-btn--active" disabled>
          {currentPage}
        </button>

        {currentPage + 1 <= totalPages && (
          <button
            className="pagination__page-btn"
            onClick={() => onPageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}

        {totalPages > 3 && currentPage < totalPages - 1 && (
          <button className="pagination__page-btn" disabled>
            ...
          </button>
        )}

        {totalPages > 3 && (
          <button
            className="pagination__page-btn"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &rsaquo;
          </button>
        )}

        {totalPages > 3 && (
          <button
            className="pagination__page-btn"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            &raquo;
          </button>
        )}
      </div>
    </>
  );
};
