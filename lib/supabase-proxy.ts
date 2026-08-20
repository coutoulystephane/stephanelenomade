import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: claimsData } = await supabase.auth.getClaims();

  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"
  ) {
    const userId = claimsData?.claims?.sub;
    const adminUserId = process.env.ADMIN_USER_ID;

    if (!userId || !adminUserId || userId !== adminUserId) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";

      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}
