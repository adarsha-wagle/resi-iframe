import React, { createContext } from "react";

import { type TMapLocation } from "src/types/app";

interface IAppContext {
  selectedMapLocation: TMapLocation | null;
  setSelectedMapLocation: React.Dispatch<
    React.SetStateAction<TMapLocation | null>
  >;
}

export const AppContext = createContext<IAppContext>({
  selectedMapLocation: null,
  setSelectedMapLocation: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedMapLocation, setSelectedMapLocation] =
    React.useState<TMapLocation | null>(null);
  return (
    <AppContext.Provider
      value={{ selectedMapLocation, setSelectedMapLocation }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
