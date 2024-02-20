import { Watchlists } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const url: URL = new URL(req.url);
  const user_id: string = url.searchParams.get("user_id") as string;

  let data: Watchlists[] = await prisma.watchlists.findMany({
    where: {
      user_id: user_id,
    },
  });
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
