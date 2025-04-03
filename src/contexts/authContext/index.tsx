import React, { useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { getUserFromFirestore } from "../../firebase/firestoreOperations";
import Loader from "../../components/Loader";

interface ExtendedUser extends User {
  role?: string;
  [key: string]: any;
}

interface AuthContextType {
  currentUser: ExtendedUser | null;
  userLoggedIn: boolean;
  loading: boolean;
  userId: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userData = await getUserFromFirestore(authUser.uid);
          setCurrentUser({ ...authUser, ...userData });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    currentUser,
    userLoggedIn: !!currentUser,
    loading,
    userId: currentUser?.uid || null,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Loader size="large" />}
    </AuthContext.Provider>
  );
}
