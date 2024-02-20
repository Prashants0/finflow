"use client";

import { useSymbolListState } from "@/app/state/symbol-list";
import { bse_symbol } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function SymbolListWrapper({ children }: { children: React.ReactNode }) {
  const { setSymbols } = useSymbolListState();

  const { data: watchlistSymbols } = useQuery({
    queryKey: ["symbolsList"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/symbol/getSymbolList`);
      setSymbols(data.symbloList as bse_symbol[]);
      return data as bse_symbol[];
    },
  });
  return <>{children}</>;
}

export default SymbolListWrapper;
