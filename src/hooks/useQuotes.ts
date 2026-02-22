import { useContext } from "react";
import type { QuoteContextType } from "../types";
import { QuoteContext } from "../context";

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used within a QuoteProvider");
  return context;
};
