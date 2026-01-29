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
  const paginationRange = usePagination({
    currentPage,
    totalCount: totalItems,
    siblingCount: 1,
    pageSize: itemsPerPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
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
      </div>
    );
  }

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

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <span key={`dots-${index}`} style={{ padding: "0 5px" }}>
                &#8230;
              </span>
            );
          }

          return (
            <button
              key={pageNumber}
              className={classNames("users-page__pagination-btn", {
                "users-page__pagination-btn--active":
                  pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </button>
          );
        })}

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

const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
  const totalPageNumbers = siblingCount + 5;

  /*
    Case 1:
    If the number of pages is less than the page numbers we want to show in our
    paginationComponent, we return the range [1..totalPageCount]
  */
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  /*
    Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
  */
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount,
  );

  /*
    We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
  */
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  /*
    Case 2: No left dots to show, but rights dots to be shown
  */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  /*
    Case 3: No right dots to show, but left dots to be shown
  */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount,
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  /*
    Case 4: Both left and right dots to be shown
  */
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return [];
};
