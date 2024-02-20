import prisma from "@/lib/prisma";
import { bse_symbol } from "@prisma/client";

export async function GET(req: Request, res: Response) {
  const symbloList = (await prisma.bse_symbol.findMany()) as bse_symbol[];

  return new Response(
    JSON.stringify({
      symbloList,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
