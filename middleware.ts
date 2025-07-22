import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Get the session and verify authentication
  const session = await auth();
  
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
    const isAdmin = session?.user?.role === 'admin' || session?.user?.isAdmin === true;
    
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
    const canEdit = session?.user?.role === 'admin' || session?.user?.role === 'editor' || session?.user?.isAdmin === true;
    
    if (!canEdit) {
      // If the user is not an admin or editor, redirect to sign-in with error
      const redirectUrl = new URL("/sign-in", req.url);
      redirectUrl.searchParams.set("error", "AccessDenied");
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If the code reaches here, the user is authenticated and authorized for the requested path
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