import React, { createContext, useState, ReactNode } from "react";
import { User } from "./types/User";

interface ActualUserContextType {
  actualUser: User | undefined;
  setActualUser: (newUser: User) => void;
}

export const ActualUserContext = createContext<
  ActualUserContextType | undefined
>(undefined);

interface ActualUserContextProviderProps {
  children: ReactNode;
}

export const ActualUserContextProvider: React.FC<
  ActualUserContextProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <ActualUserContext.Provider
      value={{ actualUser: user, setActualUser: updateUser }}
    >
      {children}
    </ActualUserContext.Provider>
  );
};
