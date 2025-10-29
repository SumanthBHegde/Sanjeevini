export { auth as middleware } from "@/auth";

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