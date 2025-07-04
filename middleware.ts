import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Get the token and verify authentication
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  
  const isAdminPath = 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/api/admin");
    
  const isEditorPath = 
    pathname.startsWith("/plant/create") || 
    pathname.startsWith("/api/plants/create") ||
    pathname.startsWith("/plant/edit") || 
    pathname.startsWith("/api/plants/edit");

  // For admin routes, check if user has admin role
  if (isAdminPath) {
    // Check if user is an admin (either by role or legacy isAdmin flag)
    const isAdmin = token?.role === 'admin' || token?.isAdmin === true;
    
    if (!isAdmin) {
      // Redirect non-admins away from admin pages
      const redirectUrl = new URL("/sign-in", req.url);
      redirectUrl.searchParams.set("error", "AccessDenied");
      return NextResponse.redirect(redirectUrl);
    }
  }

  // For content creation/editing routes, check if user has admin or editor role
  if (isEditorPath) {
    // Check if user is an admin or editor
    const canEdit = token?.role === 'admin' || token?.role === 'editor' || token?.isAdmin === true;
    
    if (!canEdit) {
      // If the user is not an admin or editor, redirect to sign-in with error
      const redirectUrl = new URL("/sign-in", req.url);
      redirectUrl.searchParams.set("error", "AccessDenied");
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Allow authenticated requests to proceed
  return NextResponse.next();
}

// Specify which paths require authentication
export const config = {
  matcher: [
    "/admin/:path*", 
    "/api/admin/:path*",
    "/plant/create",
    "/api/plants/create",
    "/plant/edit/:path*",
    "/api/plants/edit/:path*"
  ],
};