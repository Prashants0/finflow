"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import Watchlist from "./components/watchlist/Watchlist";

export default function Dashboard() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    name();
  }, []);

  async function name() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserName(user?.email!);
  }
  return (
    <div className="h-screen">
      <ResizablePanelGroup
        direction={"horizontal"}
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
      >
        <ResizablePanel defaultSize={200}>
          <h1>Dashboard</h1>
          <h1>User : {userName}</h1>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20} minSize={20}>
          <Watchlist />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
