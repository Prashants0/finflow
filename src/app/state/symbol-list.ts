import { bse_symbol } from "@prisma/client";
import { create } from "zustand";

type SymbolListState = {
  symbols: bse_symbol[];
  setSymbols: (symbols: bse_symbol[]) => void;
};

export const useSymbolListState = create<SymbolListState>()((set) => ({
  symbols: [],
  setSymbols: (symbols: bse_symbol[]) => set({ symbols }),
}));
