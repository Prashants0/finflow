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

export default function Dashboard() {
  const { symbols } = useSelectedSymbolState();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setUserName(user?.email!);
  }

  const {
    refetch: refetchChart,
    data,
    isLoading,
  } = useQuery({
    queryKey: ["chart", symbols],
    queryFn: async () => {
      const { data }: { data: SymbolCandlesData[] } = await axios.get(
        `/api/symbol/getSymbolChart?symbol=${symbols}.NS`
      );
      console.log(data);

      return data as SymbolCandlesData[];
    },
  });

  useEffect(() => {
    refetchChart();
  }, []);

  const initialData = [
    { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
    { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
    { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
    { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
    { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
    { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
    { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
    { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
    { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
  ];

  return (
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
            <ResizablePanel defaultSize={200}>
              {isLoading ? <h1>Loading</h1> : <Chart data={data} />}
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20} minSize={20}>
              <Watchlist key={user?.id} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </SelectedSymbolProvider>
      </WatchlistProvider>
    </div>
  );
}
