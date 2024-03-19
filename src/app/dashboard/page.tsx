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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SymbolCandlesData } from "@/types/symbol-types";
import { useSelectedSymbolState } from "../state/selecte-symbol";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase, useFilterSymbols } from "@/lib/utils";
import { useSymbolListState } from "../state/symbol-list";
import { Label } from "@/components/ui/label";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useChartSeriesState } from "../state/useChartSeriesState";
import { useChartState } from "../state/Chart-state";
import Holding from "./components/holding/holding";
import ChartPanel, { ChartPanelRef } from "./components/chart/chartPanel";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>();

  const chartPanelRef = useRef<ChartPanelRef>(null);

  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, [user]);

  async function getUserData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  function handlePanelResize(size: number, prevSize: number | undefined): void {
    chartPanelRef.current?.handlePanelResize();
  }

  return (
    <WatchlistProvider>
      <SelectedSymbolProvider>
        <ResizablePanelGroup
          className="h-full items-stretch"
          direction={"horizontal"}
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
        >
          <ResizablePanel
            className=" border-grey"
            defaultSize={200}
            onResize={handlePanelResize}
            key={"chart"}
          >
            <ResizablePanelGroup
              direction={"vertical"}
              onLayout={(sizes: number[]) => {
                document.cookie = `react-resizables-panels:layout=${JSON.stringify(
                  sizes
                )}`;
              }}
            >
              <ResizablePanel
                className="border-grey h-full "
                defaultSize={200}
                key={"chart"}
                onResize={handlePanelResize}
              >
                <ChartPanel ref={chartPanelRef} />
              </ResizablePanel>
              <ResizableHandle withHandle className="border-black " />
              <Holding />
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle className="border-black " />
          <ResizablePanel defaultSize={20} minSize={20}>
            <Watchlist key={user?.id} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </SelectedSymbolProvider>
    </WatchlistProvider>
  );
}
