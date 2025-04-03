import { FC } from "react";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"
import { SortableKeys, SortDirection } from "./InteractionTable";

interface SortableHeaderProps {
  label: string;
  sortKey: SortableKeys;
  sortConfig: { key: SortableKeys; direction: SortDirection };
  onSort: (sortKey: SortableKeys) => void;
}

const SortableHeader: FC<SortableHeaderProps> = ({
  label,
  sortKey,
  sortConfig,
  onSort,
}) => {
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
};

export default SortableHeader;
