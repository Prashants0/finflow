import { SymbolCandlesData } from "@/types/symbol-types";
import { create } from "zustand";

type ChartDataState = {
  chartData: SymbolCandlesData[];
  setChartData: (chartData: SymbolCandlesData[]) => void;
};

export const useChartDataStore = create<ChartDataState>()((set) => ({
  chartData: [],
  setChartData: (chartDataValue: SymbolCandlesData[]) =>
    set({ chartData: chartDataValue }),
}));
