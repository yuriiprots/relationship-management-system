import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export default function SortableHeader({ label, sortKey, sortConfig, onSort }) {
  return (
    <th
      className="cursor-pointer border border-gray-300 p-2"
      onClick={() => onSort(sortKey)}
    >
      {capitalizeFirstLetter(label)}
      {sortConfig.key === sortKey &&
        (sortConfig.direction === "asc" ? "↑" : "↓")}
    </th>
  );
}
