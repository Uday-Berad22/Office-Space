import {
  clerkMiddleware,
  createRouteMatcher,
  currentUser,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

// Add specific matcher for sign-in completion
const signInCompletionRoutes = [
  "/sign-in/sso-callback(.*)",
  "/sign-up/sso-callback(.*)",
];

const handleVerifyUser = async () => {
  try {
    const response = await fetch("/api/verify-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to verify user");
    }
  } catch (error) {
    console.error("Error verifying user:", error);
  }
};

const isPublicRoute = createRouteMatcher(publicRoutes);
const isSignInCompletion = createRouteMatcher(signInCompletionRoutes);

export default clerkMiddleware(async (auth, request) => {
  console.log("hello");
  const temp = await currentUser();
  // Check if this is a sign-in completion route
  if (temp) {
    console.log("Count---");
    try {
      // Call the verify-user API route
      await fetch(`/api/verify-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: temp?.emailAddresses[0].emailAddress,
          userId: temp?.id,
          fullName: temp?.fullName,
        }),
      });
    } catch (error) {
      console.error("Error in middleware:", error);
    }
  }

  // If it's not a public route, protect it
  if (!isPublicRoute(request)) {
    const authObject = auth();
    return authObject.userId
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
