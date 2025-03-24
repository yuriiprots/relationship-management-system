import React from "react";

export default function NoDataMessage({ onRefresh, onLoadingChange }) {
  const handleRefresh = async () => {
    if (!onRefresh) return;

    onLoadingChange(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      onLoadingChange(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <p className="mb-4">No interactions found.</p>
      {onRefresh && (
        <button
          onClick={handleRefresh}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Refresh Data
        </button>
      )}
    </div>
  );
}
