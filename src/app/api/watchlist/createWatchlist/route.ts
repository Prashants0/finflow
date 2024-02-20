import prisma from "@/lib/prisma";
import { createServerClient, CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request, res: Response) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
  let { name } = await req.json();
  let { data: userData } = await supabase.auth.getUser();
  if (userData.user == null) {
    return new Response("User not logged in", {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  await prisma.watchlists.create({
    data: {
      name: name,
      user: {
        connect: {
          id: userData.user.id,
        },
      },
    },
  });
  return new Response("Watchlist created", {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
