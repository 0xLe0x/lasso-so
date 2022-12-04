import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./src/lib/auth";

const middleware = (request: NextRequest) => {
  if (!isAuthenticated(request)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/signin";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
};

// Add your access-protected paths here
export const config = {
  matcher: ["/", "/qualify", "/search", "/email"],
};

export default middleware;
