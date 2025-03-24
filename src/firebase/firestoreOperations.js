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
  query,
  where,
} from "firebase/firestore";

// USERS

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

// INTERACTIONS

export const fetchInteractionsFromFirestore = async (userId) => {
  try {
    const userQuery = query(
      collection(db, "interactions"),
      where("userId", "==", userId),
    );
    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching interactions:", error);
    throw error;
  }
};

export const addInteractionToFirestore = async (interactionToAdd) => {
  try {
    const docRef = await addDoc(collection(db, "interactions"), {
      ...interactionToAdd,
      createdAt: new Date(),
    });
    return { id: docRef.id, ...interactionToAdd };
  } catch (error) {
    console.error("Error adding interaction:", error);
    throw error;
  }
};

export const updateInteractionInFirestore = async (interactionToEdit) => {
  try {
    const docRef = doc(db, "interactions", interactionToEdit.id);
    const docSnap = await getDoc(docRef);

    if (
      docSnap.exists() &&
      docSnap.data().userId === interactionToEdit.userId
    ) {
      await updateDoc(docRef, interactionToEdit);
      return interactionToEdit;
    } else {
      throw new Error(
        "Unauthorized: You can only update your own interactions.",
      );
    }
  } catch (error) {
    console.error("Error updating interaction:", error);
    throw error;
  }
};

export const deleteInteractionInFirestore = async (userId, interactionId) => {
  try {
    const docRef = doc(db, "interactions", interactionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().userId === userId)
      await deleteDoc(docRef);
    else {
      throw new Error(
        "Unauthorized: You can only delete your own interactions.",
      );
    }
  } catch (error) {
    console.error("Error deleting interaction:", error);
    throw error;
  }
};
