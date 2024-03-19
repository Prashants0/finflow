import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Table } from "lucide-react";
import React, {
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Chart from "./chart";
import { SymbolCandlesData } from "@/types/symbol-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useChartState } from "@/app/state/Chart-state";
import { useChartSeriesState } from "@/app/state/useChartSeriesState";
import { useSelectedSymbolState } from "@/app/state/selecte-symbol";
import { useSymbolListState } from "@/app/state/symbol-list";
import { useFilterSymbols } from "@/lib/utils";

export type ChartPanelRef = {
  handlePanelResize: () => void;
};

const ChartPanel = forwardRef<ChartPanelRef>((props, ref) => {
  const { symbol, setSymbol } = useSelectedSymbolState();
  const { symbolsList } = useSymbolListState();
  const [symbolQuery, setSymbolQuery] = useState<string>("");
  const [showAddSymbolDialog, setShowAddSymbolDialog] =
    useState<boolean>(false);

  const { chartSeries } = useChartSeriesState();
  const { chart } = useChartState();

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["chart", symbol],
    queryFn: async () => {
      const { data }: { data: SymbolCandlesData[] } = await axios.get(
        `/api/symbol/getSymbolChart?symbol=${symbol}.NS`
      );
      return data as SymbolCandlesData[];
    },
  });

  useQuery({
    queryKey: ["chartSeries"],
    queryFn: async () => {
      if (chartSeries != undefined) {
        const { data }: { data: SymbolCandlesData[] } = await axios.get(
          `/api/symbol/getSymbolChart?symbol=${symbol}.NS`
        );
        chartSeries.update(data[data.length - 1]);
        return data as SymbolCandlesData[];
      }
      return [];
    },
    refetchInterval: 300,
  });

  const { data: filteredSymbolsList, isLoading: filterSymbolsLoading } =
    useFilterSymbols(symbolQuery, symbolsList);

  function handlePanelResize(): void {
    if (chart != undefined && chartContainerRef.current != undefined) {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight - 40,
      });
    }
  }

  useImperativeHandle(ref, () => ({
    handlePanelResize: handlePanelResize,
  }));

  return (
    <>
      <Dialog open={showAddSymbolDialog} onOpenChange={setShowAddSymbolDialog}>
        <div id="chart-toolbar" className="border-b-4 p-1">
          <DialogTrigger onClick={() => setShowAddSymbolDialog(true)}>
            <Label className="text-md flex items-center gap-1 cursor-pointer hover:bg-gray-200 w-fit pr-2 pt-1 pl-1 pb-1">
              <MagnifyingGlassIcon className="w-5 h-5" /> {symbol}
            </Label>
          </DialogTrigger>
        </div>
        <div className="h-full" ref={chartContainerRef}>
          {isLoading ? <h1>Loading</h1> : <Chart symbol={symbol} data={data} />}
        </div>

        <DialogContent className="px-0 max-w-none w-[80vh] m-0">
          <DialogHeader className="p-1">
            <DialogTitle>Search Symbol</DialogTitle>
          </DialogHeader>
          <Input
            value={symbolQuery}
            onChange={(e) => setSymbolQuery(e.target.value)}
            className="rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 py-1 my-0"
            placeholder="Watchlist name"
          />
          <ScrollArea className="h-[50vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Symbol</TableHead>
                  <TableHead>Comapny Name</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filterSymbolsLoading ? (
                  <TableRow>
                    <TableCell className="font-medium">Loading...</TableCell>
                  </TableRow>
                ) : (
                  filteredSymbolsList?.map((symbol) => (
                    <TableRow
                      key={symbol.symbol_Id}
                      onClick={() => {
                        setSymbol(symbol.symbol_Id);
                        setShowAddSymbolDialog(false);
                      }}
                    >
                      <TableCell className="font-medium">
                        {symbol.symbol_Id}
                      </TableCell>
                      <TableCell>{symbol.issuer_name}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

ChartPanel.displayName = "ChartPanel";

export default ChartPanel;
