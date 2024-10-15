import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = [
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/allocate-parking(.*)",
  "/allocate-parking(.*)",
  "/api/dummy(.*)",
  "/dummy(.*)",
  "/api/clear-bookings(.*)",
  "/clear-bookings(.*)",
];
const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
