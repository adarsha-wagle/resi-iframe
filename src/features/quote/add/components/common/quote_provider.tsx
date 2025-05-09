import { createContext, useState } from "react";
import type { TActiveForm } from "./add_quote_types";

interface IQuoteContext {
  activeForm: TActiveForm;
}

export const QuoteContext = createContext<IQuoteContext>({
  activeForm: "firstPage",
});
