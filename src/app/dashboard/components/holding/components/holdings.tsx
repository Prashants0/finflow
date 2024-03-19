import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BACKEND_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import HoldingsBar from "./holdingsBar";
import { ScrollArea } from "@/components/ui/scroll-area";

export type HoldingType = {
  quantity: number;
  costPrice: number;
  symbol: string;
  ltp: number;
  dayChange: number;
  dayChangePercent: number;
  marketValue: number;
};

const Holdings = () => {
  const { data: holdings, isLoading } = useQuery({
    queryKey: ["holdings"],
    queryFn: async () => {
      const holdingsResponse = await axios.get(`${BACKEND_URL}/user/holdings?`);

      console.log(holdingsResponse, ":holdingsResponse");

      return holdingsResponse.data as HoldingType[];
    },
  });
  console.log(holdings, ":holdings");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ScrollArea className="h-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>LTP</TableHead>
              <TableHead>Avg. Price</TableHead>
              <TableHead>{"Day's change"}</TableHead>
              <TableHead>{"Day's change( % )"}</TableHead>
              <TableHead>Mrket Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdings &&
              holdings.map((holding) => (
                <HoldingsBar key={holding.symbol} holding={holding} />
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default Holdings;
