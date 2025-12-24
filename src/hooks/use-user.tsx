import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

export type User = {
  name: string;
  email: string;
  avatar?: string;
};

type UserContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  updateUser: (next: Partial<User>) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);
const STORAGE_KEY = "ictGirlsUser";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
        console.error("Failed to parse stored user", error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const updateUser = (next: Partial<User>) => {
    setUser((prev) => ({ ...(prev ?? {}), ...next } as User));
  };

  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
