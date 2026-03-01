import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import type { User } from "./types/User";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(auth.currentUser as User | null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }
      
        try {
          const ref = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(ref);
      
          if (snap.exists()) {
            setUser(snap.data() as User);
          } else {
            console.log("No Firestore profile found, using auth user");
      
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? "",
              name: firebaseUser.displayName ?? "",
            });
          }
      
        } catch (error) {
          console.error(error);
      
          // fallback — never wipe auth user
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            name: firebaseUser.displayName ?? "",
          });
        }
      
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}