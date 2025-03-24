import React from "react";

export default function FilterInputs({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {Object.keys(filters).map((key, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Filter by ${key.charAt(0).toUpperCase() + key.slice(1)}`}
          value={filters[key]}
          onChange={(e) => onFilterChange(key, e.target.value)}
          className="w-40 rounded border border-gray-300 p-2"
        />
      ))}
      <button
        onClick={onClearFilters}
        className="rounded bg-gray-300 p-2 hover:bg-gray-400"
      >
        Clear filters
      </button>
    </div>
  );
}
