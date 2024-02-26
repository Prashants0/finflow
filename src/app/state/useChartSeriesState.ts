import { IChartApi, ISeriesApi } from "lightweight-charts";
import { create } from "zustand";

type chartApiRefStore = {
  chartSeries: ISeriesApi<"Candlestick">;
  setChartSeries: (chartSeries: ISeriesApi<"Candlestick">) => void;
};

export const useChartSeriesState = create<chartApiRefStore>()((set) => ({
  chartSeries: {} as ISeriesApi<"Candlestick">,
  setChartSeries: (chartSeries: ISeriesApi<"Candlestick">) =>
    set({ chartSeries: chartSeries }),
}));
