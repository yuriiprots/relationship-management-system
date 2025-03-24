import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getUserFromFirestore,
  createUserInFirestore,
} from "./firestoreOperations";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  await createUserInFirestore(user);
  return userCredential;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const existingUser = await getUserFromFirestore(user.uid);
  if (!existingUser) {
    await createUserInFirestore(user);
  }

  return result;
};

export const doSignOut = async () => {
  await auth.signOut();
};
