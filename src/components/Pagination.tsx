import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mt-4 flex items-center justify-end gap-4">
      <button
        className="rounded bg-gray-300 p-2 hover:bg-gray-400 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="rounded bg-gray-300 p-2 hover:bg-gray-400 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
