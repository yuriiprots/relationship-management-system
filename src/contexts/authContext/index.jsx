import React from "react";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Loader from "../../components/Loader";
import { getUserFromFirestore } from "../../firebase/firestoreOperations";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });
  //   return unsubscribe;
  // }, []);

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

  const value = {
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
