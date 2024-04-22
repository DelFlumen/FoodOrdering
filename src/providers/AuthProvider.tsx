import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  profile: any;
  isLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | null>({
  session: null,
  profile: null,
  isLoading: true,
  isAdmin: false,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Record<string, any> | null>({});
  const [isLoading, setIsLoading] = useState(true);

  supabase.auth.onAuthStateChange((_event, session) => {
    setUserSession(session);
  });

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      setUserSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
      }
      setIsLoading(false);
    };
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session: userSession,
        profile,
        isLoading,
        isAdmin: profile?.group === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
