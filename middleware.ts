import { NextRequest} from "next/server";
import { getSession, updateSession} from '@/lib'
import { authRoutes, DEFAULT_LOGIN_REDIRECT, protectedRoutes} from "./routes";

export async function middleware(req:NextRequest) {
  await updateSession(req);
  const { nextUrl } = req;
  const session = await getSession();
  const isLoggedIn = !!session;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if(isProtectedRoute){
    if(!isLoggedIn){
      return Response.redirect(new URL(authRoutes[0],nextUrl));
    }
    return null;
  } 
  return null;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}