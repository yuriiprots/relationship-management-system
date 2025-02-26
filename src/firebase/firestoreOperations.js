import { db } from "./firebaseConfig";
import {
  collection,
  setDoc,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// INTERACTIONS

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

export const addInteractionToFirestore = async (interactionToAdd) => {
  try {
    const docRef = await addDoc(
      collection(db, "interactions"),
      interactionToAdd,
    );
    return { id: docRef.id, ...interactionToAdd };
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
  } catch (error) {
    console.error("Error updating interaction:", error);
    throw error;
  }
};

export const deleteInteractionInFirestore = async (interactionId) => {
  try {
    const docRef = doc(db, "interactions", interactionId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting interaction:", error);
    throw error;
  }
};

// USERS

export const getUserFromFirestore = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("User does not exist in Firestore.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUserInFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      createdAt: new Date(),
      uid: user.uid,
      email: user.email,
    });
  } catch (error) {
    console.error("Error creating user in Firestore:", error);
    throw error;
  }
};

export const updateUserInFirestore = async (uid, userData) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, userData);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
