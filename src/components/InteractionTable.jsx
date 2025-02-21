import React, { useState, useMemo } from "react";
import SortableHeader from "./SortableHeader";
import formatDate from "../utils/formatDate";

export default function InteractionTable({
  interactionsData,
  editInteraction,
  deleteInteraction,
}) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [filters, setFilters] = useState({
    date: "",
    mood: "",
    person: "",
    emotion: "",
    summary: "",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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

  // return (
  //   <div className="flex flex-col py-4">
  //     <div className="mb-4 flex flex-wrap items-center gap-2">
  //       {Object.keys(filters).map((key, index) => (
  //         <input
  //           key={index}
  //           type="text"
  //           placeholder={`Filter by ${key.charAt(0).toUpperCase() + key.slice(1)}`}
  //           value={filters[key]}
  //           onChange={(e) => handleFilterChange(key, e.target.value)}
  //           className="w-40 rounded border border-gray-300 p-2"
  //         />
  //       ))}
  //       <button
  //         onClick={() =>
  //           setFilters({
  //             date: "",
  //             mood: "",
  //             person: "",
  //             emotion: "",
  //             summary: "",
  //           })
  //         }
  //         className="rounded bg-gray-300 p-2 hover:bg-gray-400"
  //       >
  //         Clear filters
  //       </button>
  //     </div>
  //     <table>
  //       <thead>
  //         <tr className="bg-gray-200">
  //           <th className="border border-gray-300 p-2">№</th>
  //           <SortableHeader
  //             label="Date"
  //             sortKey="date"
  //             sortConfig={sortConfig}
  //             onSort={handleSort}
  //           />
  //           <SortableHeader
  //             label="Mood"
  //             sortKey="mood"
  //             sortConfig={sortConfig}
  //             onSort={handleSort}
  //           />
  //           <SortableHeader
  //             label="Person"
  //             sortKey="person"
  //             sortConfig={sortConfig}
  //             onSort={handleSort}
  //           />
  //           <SortableHeader
  //             label="Emotion"
  //             sortKey="emotion"
  //             sortConfig={sortConfig}
  //             onSort={handleSort}
  //           />
  //           <th className="border border-gray-300 p-2">Summary</th>
  //           <th className="border border-gray-300 p-2">Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {sortedAndFilteredData.map((interaction, index) => (
  //           <tr key={index} className="hover:bg-gray-100">
  //             <td className="border border-gray-300 p-2 text-center">
  //               {sortedAndFilteredData.length - index}
  //             </td>
  //             <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
  //               {formatDate(interaction.date)}
  //             </td>
  //             <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
  //               {interaction.mood}
  //             </td>
  //             <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
  //               {interaction.person}
  //             </td>
  //             <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
  //               {interaction.emotion}
  //             </td>
  //             <td
  //               className="break-word border border-gray-300 p-2 text-center"
  //               style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
  //             >
  //               {interaction.summary}
  //             </td>
  //             <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
  //               <div>
  //                 <button
  //                   className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
  //                   onClick={() => editInteraction(interaction)}
  //                 >
  //                   Edit
  //                 </button>
  //                 <button
  //                   className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
  //                   onClick={() => deleteInteraction(interaction)}
  //                 >
  //                   Delete
  //                 </button>
  //               </div>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  return interactionsData.length ? (
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
      <table>
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">№</th>
            <SortableHeader
              label="Date"
              sortKey="date"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <SortableHeader
              label="Mood"
              sortKey="mood"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <SortableHeader
              label="Person"
              sortKey="person"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <SortableHeader
              label="Emotion"
              sortKey="emotion"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <th className="border border-gray-300 p-2">Summary</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredData.map((interaction, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center">
                {sortedAndFilteredData.length - index}
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
              <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                <div>
                  <button
                    className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                    onClick={() => editInteraction(interaction)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                    onClick={() => deleteInteraction(interaction.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div></div>
  );
}
