import prisma from "@/lib/prisma";
import { createServerClient, CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function DELETE(req: Request, res: Response) {
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
  let { watchlist_id } = await req.json();
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
  await prisma.watchlists.delete({
    select: {
      user_id: true,
      name: true,
    },
    where: {
      watchlist_id: watchlist_id,
      AND: {
        user_id: userData.user.id,
      },
    },
  });
  return new Response("Watchlist Deleted", {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
