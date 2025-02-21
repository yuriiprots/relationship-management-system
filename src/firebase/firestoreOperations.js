import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const fetchInteractionsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "interactions"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching interactions:", error);
    throw error;

    //   setInteractionsData(interactions);
  }
};

export const addInteractionToFirestore = async (InteractionToAdd) => {
  try {
    const docRef = await addDoc(
      collection(db, "interactions"),
      InteractionToAdd,
    );
    return { id: docRef.id, ...InteractionToAdd };
    //setInteractionsData([{ id: docRef.id, ...newData }, ...interactionsData]);
  } catch (error) {
    console.error("Error adding interaction:", error);
    throw error;
  }
};

export const updateInteractionInFirestore = async (interactionToEdit) => {
  try {
    const docRef = doc(db, "interactions", interactionToEdit.id);
    await updateDoc(docRef, interactionToEdit);
    return interactionToEdit;
    // const updatedData = interactionsData.map((interaction) =>
    //   interaction.id === editingInteraction.id
    //     ? interactionToEdit
    //     : interaction,
    // );

    // setInteractionsData(updatedData);
    // setEditingInteraction(null);
  } catch (error) {
    console.error("Error updating interaction:", error);
    throw error;
  }
};

export const deleteInteractionInFirestore = async (interactionId) => {
  try {
    const docRef = doc(db, "interactions", interactionId);
    await deleteDoc(docRef);
    // const updatedData = interactionsData.filter(
    //   (interaction) => interaction !== interactionToDelete,
    // );
    // setInteractionsData(updatedData);
    // setEditingInteraction(null);
  } catch (error) {
    console.error("Error deleting interaction:", error);
    throw error;
  }
};
