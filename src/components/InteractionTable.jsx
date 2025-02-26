import { useState, useMemo } from "react";
import formatDate from "../utils/formatDate";
import SortableHeader from "./SortableHeader";
import Loader from "./Loader";

export default function InteractionTable({
  interactionsData,
  editInteraction,
  deleteInteraction,
  isLoading: externalLoading,
  onRefresh,
}) {
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const [filters, setFilters] = useState({
    date: "",
    mood: "",
    person: "",
    emotion: "",
    summary: "",
  });

  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const isLoading = externalLoading || isLocalLoading;

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this interaction?")) {
      setIsLocalLoading(true);

      try {
        await deleteInteraction(id);
      } finally {
        setIsLocalLoading(false);
      }
    }
  };

  const handleRefresh = async () => {
    if (onRefresh) {
      try {
        await onRefresh();
      } finally {
        setIsLocalLoading(false);
      }
    }
  };

  const sortedAndFilteredData = useMemo(() => {
    return interactionsData
      .filter((interaction) => {
        return Object.keys(filters).every((key) =>
          String(interaction[key] || "")
            .toLowerCase()
            .includes(filters[key].toLowerCase()),
        );
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;

        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        const isNumber = (val) => !isNaN(parseFloat(val)) && isFinite(val);

        if (isNumber(valueA) && isNumber(valueB)) {
          valueA = Number(valueA);
          valueB = Number(valueB);
        } else if (!isNaN(Date.parse(valueA)) && !isNaN(Date.parse(valueB))) {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        } else {
          valueA = String(valueA).toLowerCase();
          valueB = String(valueB).toLowerCase();
        }

        return (
          (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) *
          (sortConfig.direction === "asc" ? 1 : -1)
        );
      });
  }, [interactionsData, filters, sortConfig]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader text="Loading interactions..." size="large" color="primary" />
      </div>
    );
  }

  if (!interactionsData.length) {
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

  return (
    <div className="flex flex-col py-4">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {Object.keys(filters).map((key, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Filter by ${key.charAt(0).toUpperCase() + key.slice(1)}`}
            value={filters[key]}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            className="w-40 rounded border border-gray-300 p-2"
          />
        ))}
        <button
          onClick={() =>
            setFilters({
              date: "",
              mood: "",
              person: "",
              emotion: "",
              summary: "",
            })
          }
          className="rounded bg-gray-300 p-2 hover:bg-gray-400"
        >
          Clear filters
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 p-2">№</th>
            {["date", "mood", "person", "emotion"].map((key) => (
              <SortableHeader
                key={key}
                label={key}
                sortKey={key}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            ))}
            <th className="border border-gray-300 p-2">Summary</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((interaction, index) => (
            <tr
              key={index}
              className="border-b transition duration-200 hover:bg-gray-100"
            >
              <td className="border border-gray-300 p-2 text-center">
                {sortedAndFilteredData.length -
                  ((currentPage - 1) * itemsPerPage + index)}
              </td>
              <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                {formatDate(interaction.date)}
              </td>
              <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                {interaction.mood}
              </td>
              <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                {interaction.person}
              </td>
              <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                {interaction.emotion}
              </td>
              <td
                className="break-word border border-gray-300 p-2 text-center"
                style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
              >
                {interaction.summary}
              </td>
              <td className="w-[120px] border border-gray-300 p-2 text-center whitespace-nowrap">
                <div className="flex justify-center gap-2">
                  <button
                    className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                    onClick={() => editInteraction(interaction)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    onClick={() => handleDelete(interaction.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-end gap-4">
        <button
          className="rounded bg-gray-300 p-2 hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="rounded bg-gray-300 p-2 hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
