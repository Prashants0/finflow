import { PrismaClient, Watchlist_items } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  const url: URL = new URL(req.url);
  const watchlist_id: string = url.searchParams.get("watchlist_id") as string;
  if (!watchlist_id) {
    return new Response("watchlist_id is required", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  let data: Watchlist_items[] = await prisma.watchlist_items.findMany({
    where: {
      watchlist_id: watchlist_id,
    },
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
