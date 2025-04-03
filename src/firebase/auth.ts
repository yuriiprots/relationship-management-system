import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  User,
} from "firebase/auth";
import {
  getUserFromFirestore,
  createUserInFirestore,
} from "./firestoreOperations";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await createUserInFirestore(userCredential.user);
  return userCredential;
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user: User = result.user;

  const existingUser = await getUserFromFirestore(user.uid);
  if (!existingUser) {
    await createUserInFirestore(user);
  }

  return result;
};

export const doSignOut = async (): Promise<void> => {
  await auth.signOut();
};
