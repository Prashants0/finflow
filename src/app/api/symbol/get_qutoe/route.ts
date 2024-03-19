import yahooFinance from "yahoo-finance2";

export async function POST(req: Request, res: Response) {
  const { symbol } = await req.json();

  const {
    regularMarketChange,
    regularMarketPrice,
    regularMarketChangePercent,
  } = await yahooFinance.quoteCombine(`${symbol}.NS`);
  return new Response(
    JSON.stringify({
      change: regularMarketChange?.toFixed(2),
      price: regularMarketPrice?.toFixed(2),
      changePercent: regularMarketChangePercent?.toFixed(2),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
