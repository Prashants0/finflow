import { TableCell, TableRow } from "@/components/ui/table";
import React, { useState } from "react";
import { HoldingType } from "./holdings";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const HoldingsBar = ({ holding }: { holding: HoldingType }) => {
  const [symbolChangeStatusCss, setsymbolChangeStatusCss] =
    useState<String>("text-gray-400");
  const { isLoading } = useQuery({
    queryKey: ["holding", holding.symbol],
    queryFn: async () => {
      const { data: qutoe } = await axios.post(`/api/symbol/get_qutoe`, {
        symbol: holding.symbol,
      });
      console.log(holding.symbol, "quoet");

      if (qutoe.change > 0) {
        setsymbolChangeStatusCss("text-green-400");
      }
      if (qutoe.change < 0) {
        setsymbolChangeStatusCss("text-red-400");
      }
      if (qutoe.change === 0) {
        setsymbolChangeStatusCss("text-gray-400");
      }
      holding.ltp = qutoe.price;
      holding.dayChange = qutoe.change;
      holding.dayChangePercent = qutoe.changePercent;
      holding.marketValue = qutoe.price * holding.quantity;
      return holding;
    },
    refetchInterval: 300,
  });
  return (
    <>
      <TableRow key={holding.symbol}>
        <TableCell>{holding.symbol}</TableCell>
        <TableCell>{holding.quantity}</TableCell>
        <TableCell>{holding.ltp}</TableCell>
        <TableCell>{holding.costPrice}</TableCell>
        <TableCell>{holding.dayChange}</TableCell>
        <TableCell>{holding.dayChangePercent}</TableCell>
        <TableCell>{holding.marketValue}</TableCell>
      </TableRow>
    </>
  );
};

export default HoldingsBar;
