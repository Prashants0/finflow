import prisma from "@/lib/prisma";
import { bse_symbol } from "@prisma/client";
import { createServerClient, CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function DELETE(req: Request, res: Response) {
  const {
    watchlist_id,
    symbol,
  }: {
    watchlist_id: string;
    symbol: string;
  } = await req.json();
  await prisma.watchlist_items.delete({
    where: {
      symbol_watchlist_id: {
        symbol: symbol,
        watchlist_id: watchlist_id,
      },
    },
  });
  return new Response("Watchlist Symbol Deleted", {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
