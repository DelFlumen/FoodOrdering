import { CartItem, Product } from "@/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>({
  session: null,
  isLoading: true,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    };
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
