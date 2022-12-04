import { NextRequest } from "next/server";

export const isAuthenticated = (request: NextRequest): boolean => {
  const tokenValid = !!request.cookies.get("authToken")?.value;
  // FIXME: Drop-in token validation with the backend here, to protect invalid UI states
  //        (no API access, but js bundle sent)
  return tokenValid;
};
