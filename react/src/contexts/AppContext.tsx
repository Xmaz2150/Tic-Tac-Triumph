import { useContext, createContext } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw Error("useAppContext must be used within AppContext Provider");
  }

  return context;
};
