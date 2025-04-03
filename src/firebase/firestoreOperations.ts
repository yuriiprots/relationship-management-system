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
  Timestamp,
} from "firebase/firestore";
import { User as FirebaseAuthUser } from "firebase/auth";
import { Interaction } from "../types/Interaction";
import { User } from "../types/User";

// USERS

export const createUserInFirestore = async (
  user: FirebaseAuthUser,
): Promise<void> => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error creating user in Firestore:", error);
    throw error;
  }
};

export const updateUserInFirestore = async (
  uid: string,
  userData: Partial<User>,
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, userData);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUserFromFirestore = async (
  uid: string,
): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data() as User;

      return {
        ...userData,
        createdAt:
          userData.createdAt instanceof Timestamp
            ? userData.createdAt.toDate()
            : userData.createdAt,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// INTERACTIONS

export const fetchInteractionsFromFirestore = async (
  userId: string,
): Promise<Interaction[]> => {
  try {
    const userQuery = query(
      collection(db, "interactions"),
      where("userId", "==", userId),
    );
    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : data.createdAt,
      } as Interaction;
    });
  } catch (error) {
    console.error("Error fetching interactions:", error);
    throw error;
  }
};

export const addInteractionToFirestore = async (
  interactionToAdd: Omit<Interaction, "id" | "createdAt">,
): Promise<Interaction> => {
  try {
    const docRef = await addDoc(collection(db, "interactions"), {
      ...interactionToAdd,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...interactionToAdd, createdAt: new Date() };
  } catch (error) {
    console.error("Error adding interaction:", error);
    throw error;
  }
};

export const updateInteractionInFirestore = async (
  interactionToEdit: Interaction,
): Promise<Interaction> => {
  try {
    const docRef = doc(db, "interactions", interactionToEdit.id!);
    const docSnap = await getDoc(docRef);

    if (
      docSnap.exists() &&
      docSnap.data().userId === interactionToEdit.userId
    ) {
      await updateDoc(docRef, {
        ...interactionToEdit,
        createdAt:
          interactionToEdit.createdAt instanceof Date
            ? Timestamp.fromDate(interactionToEdit.createdAt)
            : interactionToEdit.createdAt,
      });
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

export const deleteInteractionInFirestore = async (
  userId: string,
  interactionId: string,
): Promise<void> => {
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
