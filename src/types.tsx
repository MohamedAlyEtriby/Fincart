export interface Destination {
  country: string;
  city: string;
}

export interface Courier {
  name: string;
  price: number;
  estimatedDays: number;
}

export interface QuoteContextType {
  weight: number;
  setWeight: (w: number) => void;
  destination: Destination;
  setDestination: (d: Destination) => void;
}
