import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InteractionForm from "../components/InteractionForm";
import InteractionTable from "../components/InteractionTable";
import {
  fetchInteractionsFromFirestore,
  addInteractionToFirestore,
  updateInteractionInFirestore,
  deleteInteractionInFirestore,
} from "../firebase/firestoreOperations";

export default function Main() {
  const [showForm, setShowForm] = useState(false);
  const [interactionsData, setInteractionsData] = useState([]);
  const [editingInteraction, setEditingInteraction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadInteractions = async () => {
    setIsLoading(true);
    try {
      const interactions = await fetchInteractionsFromFirestore();
      setInteractionsData(interactions);
      // toast.success("Interactions loaded successfully");
    } catch (error) {
      toast.error(`Failed to load interactions: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInteractions();
  }, []);

  // const addInteractionInLocalstorage = (newData) => {
  //   const updatedData = [newData, ...interactionsData];
  //   setInteractionsData(updatedData);
  //   localStorage.setItem("interactionsData", JSON.stringify(updatedData));
  // };

  const handleAddInteraction = async (InteractionToAdd) => {
    try {
      const addedInteraction =
        await addInteractionToFirestore(InteractionToAdd);
      setInteractionsData((prev) => [addedInteraction, ...prev]);
      toast.success("Interaction added successfully!");
    } catch (error) {
      toast.error(`Failed to add interaction: ${error}`);
    }
  };

  const handleUpdateInteraction = async (interactionToEdit) => {
    try {
      const updatedInteraction =
        await updateInteractionInFirestore(interactionToEdit);

      setInteractionsData((prev) =>
        prev.map((interaction) =>
          interaction.id === updatedInteraction.id
            ? updatedInteraction
            : interaction,
        ),
      );

      // const updatedInteraction = interactionsData.map((interaction) =>
      //   interaction.id === editingInteraction.id
      //     ? interactionToEdit
      //     : interaction,
      // );
      setEditingInteraction(null);
      toast.success("Interaction updated successfully!");
    } catch (error) {
      toast.error(`Failed to update interaction: ${error}`);
    }
  };

  const editInteraction = (interaction) => {
    setEditingInteraction(interaction);
    setShowForm(true);
  };

  const handleDeleteInteraction = async (interactionToDeleteId) => {
    try {
      await deleteInteractionInFirestore(interactionToDeleteId);
      setInteractionsData((prev) =>
        prev.filter((interaction) => interaction.id !== interactionToDeleteId),
      );
      toast.success("Interaction deleted successfully!");
      // const updatedData = interactionsData.filter(
      //   (interaction) => interaction !== interactionToDelete,
      // );
      // setInteractionsData(updatedData);
      // setEditingInteraction(null);
    } catch (error) {
      toast.error(`Failed to delete interaction: ${error}`);
    }
  };

  // const updateInteractionInLocalstorage = (interactionToEdit) => {
  //   const updatedData = interactionsData.map((interaction) =>
  //     interaction === editingInteraction ? interactionToEdit : interaction,
  //   );
  //   setInteractionsData(updatedData);
  //   localStorage.setItem("interactionsData", JSON.stringify(updatedData));
  //   setEditingInteraction(null);
  // };

  // const deleteIneractionInLocalstorage = (interactionToDelete) => {
  //   const updatedData = interactionsData.filter(
  //     (interaction) => interaction !== interactionToDelete,
  //   );
  //   setInteractionsData(updatedData);
  //   localStorage.setItem("interactionsData", JSON.stringify(updatedData));
  //   setEditingInteraction(null);
  // };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="h-full">
      <h2 className="text-lg font-bold">Interactions</h2>
      <InteractionTable
        interactionsData={interactionsData}
        editInteraction={editInteraction}
        deleteInteraction={handleDeleteInteraction}
        isLoading={isLoading}
        onRefresh={loadInteractions}
      />
      <button
        onClick={toggleForm}
        className="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        Add interaction
      </button>
      {showForm && (
        <InteractionForm
          onClose={toggleForm}
          addInteraction={handleAddInteraction}
          editingInteraction={editingInteraction}
          updateInteraction={handleUpdateInteraction}
        />
      )}
    </div>
  );
}
