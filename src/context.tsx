import { createContext, useState, type ReactNode } from "react";
import type { Destination, QuoteContextType } from "./types";

export const QuoteContext = createContext<QuoteContextType | undefined>(
  undefined,
);

interface QuoteProviderProps {
  children: ReactNode;
}

export const QuoteProvider = ({ children }: QuoteProviderProps) => {
  const [weight, setWeight] = useState<number>(0);
  const [destination, setDestination] = useState<Destination>({
    country: "",
    city: "",
  });

  return (
    <QuoteContext.Provider
      value={{ weight, setWeight, destination, setDestination }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
