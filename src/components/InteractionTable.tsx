import { useState, useMemo, useCallback, FC } from "react";
import SortableHeader from "./SortableHeader";
import FilterInputs from "./FilterInputs";
import Pagination from "./Pagination";
import NoDataMessage from "./NoDataMessage";
import LoadingState from "./LoadingState";
import formatDate from "../utils/formatDate";
import { Interaction } from "../types/Interaction";

interface InteractionTableProps {
  interactionsData: Interaction[];
  editInteraction: (interaction: Interaction) => void;
  deleteInteraction: (id: string) => Promise<void>;
  isLoading: boolean;
  onRefresh: () => Promise<void>;
}

export type SortableKeys = keyof Pick<
  Interaction,
  "date" | "emotion" | "mood" | "person"
>;
export type SortDirection = "asc" | "desc";

type FilterKeys = keyof Pick<
  Interaction,
  "date" | "emotion" | "mood" | "person" | "summary"
>;
type Filters = Record<FilterKeys, string>;

const InteractionTable: FC<InteractionTableProps> = ({
  interactionsData,
  editInteraction,
  deleteInteraction,
  isLoading: externalLoading,
  onRefresh,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: SortDirection;
  }>({
    key: "date",
    direction: "desc",
  });

  const [filters, setFilters] = useState<Partial<Filters>>({
    date: "",
    mood: "",
    person: "",
    emotion: "",
    summary: "",
  });

  const handleSort = useCallback((key: SortableKeys) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const handleFilterChange = useCallback((key: SortableKeys, value: string) => {
    setFilters((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
    setCurrentPage(1);
  }, []);

  const sortedAndFilteredData = useMemo(() => {
    const filtered = interactionsData.filter((interaction) => {
      return Object.keys(filters).every((key) =>
        String(interaction[key as SortableKeys] || "")
          .trim()
          .toLowerCase()
          .includes(filters[key as SortableKeys]?.toLowerCase() || ""),
      );
    });

    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      let valueA = a[sortConfig.key];
      let valueB = b[sortConfig.key];

      // const isNumber = (val) => !isNaN(parseFloat(val)) && isFinite(val);
      // const isDate = (val) => !isNaN(Date.parse(val));

      const isNumber = (val: unknown): val is number => typeof val === "number";
      const isDate = (val: unknown): val is string =>
        !isNaN(Date.parse(val as string));

      if (isNumber(valueA) && isNumber(valueB)) {
        return (valueA - valueB) * (sortConfig.direction === "asc" ? 1 : -1);
      } else if (isDate(valueA) && isDate(valueB)) {
        return (
          new Date(valueA).getTime() -
          new Date(valueB).getTime() * (sortConfig.direction === "asc" ? 1 : -1)
        );
      } else {
        return (
          String(valueA).localeCompare(String(valueB)) *
          (sortConfig.direction === "asc" ? 1 : -1)
        );
      }
    });
  }, [interactionsData, filters, sortConfig]);

  const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false);
  const isLoading = externalLoading || isLocalLoading;

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this interaction?"))
      return;
    setIsLocalLoading(true);

    try {
      await deleteInteraction(id);
    } catch (error) {
      console.error("Error deleting interaction:", error);
    } finally {
      setIsLocalLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  if (isLoading) return <LoadingState />;

  if (!interactionsData.length)
    return (
      <NoDataMessage
        onRefresh={onRefresh}
        onLoadingChange={setIsLocalLoading}
      />
    );

  return (
    <div className="flex flex-col py-4">
      <FilterInputs
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={() =>
          setFilters({
            date: "",
            mood: "",
            person: "",
            emotion: "",
            summary: "",
          })
        }
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 p-2">№</th>
            {(["date", "mood", "person", "emotion"] as SortableKeys[]).map(
              (key) => (
                <SortableHeader
                  key={key}
                  label={key}
                  sortKey={key}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
              ),
            )}
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
                    onClick={() => handleDelete(interaction.id!)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default InteractionTable;
