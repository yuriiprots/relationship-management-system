import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-4">
      <button
        className="rounded bg-gray-300 p-2 hover:bg-gray-400 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="rounded bg-gray-300 p-2 hover:bg-gray-400 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
      >
        Next
      </button>
    </div>
  );
}
