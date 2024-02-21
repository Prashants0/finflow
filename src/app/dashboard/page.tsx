"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useRef, useState } from "react";
import Watchlist from "./components/watchlist/Watchlist";
import { User } from "@supabase/supabase-js";
import { SelectedSymbolProvider } from "./contexts/selectedSymbol";
import { WatchlistProvider } from "./contexts/watchlist";
import Chart from "./components/chart/chart";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SymbolCandlesData } from "@/types/symbol-types";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useSelectedSymbolState } from "../state/selecte-symbol";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { bse_symbol } from "@prisma/client";
import { filterSymbols } from "@/lib/utils";
import { useSymbolListState } from "../state/symbol-list";
import { Label } from "@/components/ui/label";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Dashboard() {
  const { symbol, setSymbol } = useSelectedSymbolState();
  const { symbolsList } = useSymbolListState();
  const [symbolQuery, setSymbolQuery] = useState<string>("");
  const [showAddSymbolDialog, setShowAddSymbolDialog] =
    useState<boolean>(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }

  const {
    refetch: refetchChart,
    data,
    isLoading,
  } = useQuery({
    queryKey: ["chart", symbol],
    queryFn: async () => {
      const { data }: { data: SymbolCandlesData[] } = await axios.get(
        `/api/symbol/getSymbolChart?symbol=${symbol}.NS`
      );
      console.log(data);

      return data as SymbolCandlesData[];
    },
  });

  useEffect(() => {
    refetchChart();
  }, []);

  const { data: filteredSymbolsList, isLoading: filterSymbolsLoading } =
    filterSymbols(symbolQuery, symbolsList);

  return (
    <Dialog open={showAddSymbolDialog} onOpenChange={setShowAddSymbolDialog}>
      <div className="h-[93vh]">
        <WatchlistProvider>
          <SelectedSymbolProvider>
            <ResizablePanelGroup
              direction={"horizontal"}
              onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                  sizes
                )}`;
              }}
            >
              <ResizablePanel
                className="border-4 border-grey"
                defaultSize={200}
              >
                <div id="chart-toolbar" className="border-b-4 p-1">
                  <DialogTrigger onClick={() => setShowAddSymbolDialog(true)}>
                    <Label className="text-md flex items-center gap-1 cursor-pointer hover:bg-gray-200 w-fit pr-2 pt-1 pl-1 pb-1">
                      <MagnifyingGlassIcon className="w-5 h-5" /> {symbol}
                    </Label>
                  </DialogTrigger>
                </div>
                <div>
                  {isLoading ? (
                    <h1>Loading</h1>
                  ) : (
                    <Chart symbol={symbol} data={data} />
                  )}
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={20} minSize={20}>
                <Watchlist key={user?.id} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </SelectedSymbolProvider>
        </WatchlistProvider>
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
  );
}
