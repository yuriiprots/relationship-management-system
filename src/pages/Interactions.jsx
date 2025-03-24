import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  fetchInteractionsFromFirestore,
  addInteractionToFirestore,
  updateInteractionInFirestore,
  deleteInteractionInFirestore,
} from "../firebase/firestoreOperations";
import InteractionForm from "../components/InteractionForm";
import InteractionTable from "../components/InteractionTable";
import { useAuth } from "../contexts/authContext";

export default function Interactions() {
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [interactionsData, setInteractionsData] = useState([]);
  const [editingInteraction, setEditingInteraction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadInteractions = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const interactions = await fetchInteractionsFromFirestore(
        currentUser.uid,
      );
      setInteractionsData(interactions);
    } catch (error) {
      toast.error(`Failed to load interactions: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) loadInteractions();
  }, [currentUser, loadInteractions]);

  const handleCreateInteraction = async (interactionToAdd) => {
    if (!currentUser) return;
    console.log("Creating interaction:", interactionToAdd);

    try {
      const addedInteraction = await addInteractionToFirestore({
        ...interactionToAdd,
        userId: currentUser.uid,
      });
      console.log("Added interaction:", addedInteraction);
      setInteractionsData((prev) => [addedInteraction, ...prev]);
      toast.success("Interaction added successfully!");
    } catch (error) {
      toast.error(`Failed to add interaction: ${error}`);
    }
  };

  const handleUpdateInteraction = async (interactionToEdit) => {
    if (!currentUser) return;
    try {
      const updatedInteraction = await updateInteractionInFirestore({
        ...interactionToEdit,
        userId: currentUser.uid,
      });

      setInteractionsData((prev) =>
        prev.map((interaction) =>
          interaction.id === updatedInteraction.id
            ? updatedInteraction
            : interaction,
        ),
      );
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
      await deleteInteractionInFirestore(
        currentUser.uid,
        interactionToDeleteId,
      );
      setInteractionsData((prev) =>
        prev.filter((interaction) => interaction.id !== interactionToDeleteId),
      );
      toast.success("Interaction deleted successfully!");
    } catch (error) {
      toast.error(`Failed to delete interaction: ${error}`);
    }
  };

  const handleShowFormForNewInteraction = () => {
    setEditingInteraction(null);
    setShowForm(true);
  };

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
        onClick={handleShowFormForNewInteraction}
        className="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        Add new interaction
      </button>
      {showForm && (
        <InteractionForm
          onClose={toggleForm}
          createInteraction={handleCreateInteraction}
          editingInteraction={editingInteraction}
          updateInteraction={handleUpdateInteraction}
        />
      )}
    </div>
  );
}
