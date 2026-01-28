import classNames from "classnames";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  return (
    <div className="users-page__pagination">
      <div className="users-page__pagination-info">
        Showing
        <select
          className="users-page__pagination-select"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        out of {totalItems}
      </div>

      <div className="users-page__pagination-controls">
        <button
          className={classNames(
            "users-page__pagination-btn users-page__pagination-btn--nav",
          )}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {[1, 2, 3].map((pageNum) => (
          <button
            key={pageNum}
            className={classNames("users-page__pagination-btn", {
              "users-page__pagination-btn--active": pageNum === currentPage,
            })}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        {totalPages > 5 && <span style={{ padding: "0 5px" }}>...</span>}
        {totalPages > 3 && (
          <button
            className={classNames("users-page__pagination-btn", {
              "users-page__pagination-btn--active": totalPages === currentPage,
            })}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}

        <button
          className={classNames(
            "users-page__pagination-btn users-page__pagination-btn--nav",
          )}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
