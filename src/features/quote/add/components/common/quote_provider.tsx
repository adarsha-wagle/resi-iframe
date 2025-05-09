import React, { createContext, useState } from "react";
import type { TActiveForm } from "./add_quote_types";

interface IQuoteContext {
  activeForm: TActiveForm;
  setActiveForm: React.Dispatch<React.SetStateAction<TActiveForm>>;
}

export const QuoteContext = createContext<IQuoteContext>({
  activeForm: "firstPage",
  setActiveForm: () => {},
});

// Provider component
export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeForm, setActiveForm] = useState<TActiveForm>("firstPage");
  return (
    <QuoteContext.Provider value={{ activeForm, setActiveForm }}>
      {children}
    </QuoteContext.Provider>
  );
};

// Custom Hook for using the context
export const useQuoteContext = () => {
  const context = React.useContext(QuoteContext);
  if (context === undefined) {
    throw new Error("useQuoteContext must be used within a QuoteProvider");
  }
  return context;
};
