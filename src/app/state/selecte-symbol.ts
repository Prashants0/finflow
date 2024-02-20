import { bse_symbol } from "@prisma/client";
import { create } from "zustand";

type SelectedSymbolState = {
  symbols: string;
  setSymbols: (symbols: string) => void;
};

export const useSelectedSymbolState = create<SelectedSymbolState>()((set) => ({
  symbols: "HDFCBANK",
  setSymbols: (symbols: string) => set({ symbols }),
}));
