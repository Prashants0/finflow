import { bse_symbol } from "@prisma/client";
import { create } from "zustand";

type SymbolListState = {
  symbolsList: bse_symbol[];
  setSymbols: (symbolsList: bse_symbol[]) => void;
};

export const useSymbolListState = create<SymbolListState>()((set) => ({
  symbolsList: [],
  setSymbols: (symbols: bse_symbol[]) => set({ symbolsList: symbols }),
}));
