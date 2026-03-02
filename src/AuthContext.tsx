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
        
          const profileData = snap.exists() ? snap.data() : {};
        
          setUser({
            uid: firebaseUser.uid,                 // ALWAYS from auth
            email: firebaseUser.email ?? "",
            name: profileData.name ?? "",
          });
        
        } catch (error) {
          console.error(error);
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