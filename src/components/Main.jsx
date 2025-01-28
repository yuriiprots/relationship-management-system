import React, { useState, useEffect } from "react";
import InteractionForm from "./InteractionForm";
import InteractionTable from "./InteractionTable";

export default function Main() {
  const [showForm, setShowForm] = useState(false);
  const [interactionsData, setInteractionsData] = useState([]);

  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("interactionsData")) || [];
    setInteractionsData(storedData);
  }, []);

  const addInteraction = (newData) => {
    const updatedData = [newData, ...interactionsData];
    setInteractionsData(updatedData);
    localStorage.setItem("interactionsData", JSON.stringify(updatedData));
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="flex-1 p-4 bg-gray-50">
      <div className="h-full">
        <h2 className="text-lg font-bold">Main</h2>

        <button
          onClick={toggleForm}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add interaction
        </button>
        {showForm && (
          <InteractionForm
            onClose={toggleForm}
            addInteraction={addInteraction}
          />
        )}

        <InteractionTable interactionsData={interactionsData} />
      </div>
    </div>
  );
}
