type CookieOptions = {
  expires?: Date;
  maxAge?: number; // giây
  domain?: string;
  httpOnly?: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  path: string;
};

export const cookiesOption = (expiresMs?: number | null): CookieOptions => {
  const isProd = process.env.NODE_ENV === "production";

  if (!expiresMs || expiresMs <= 0) {
    // xoá cookie
    return {
      expires: new Date(0),
      domain: isProd ? ".duyngo.com" : undefined,
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    };
  }

  return {
    maxAge: Math.floor(expiresMs / 1000),
    expires: new Date(Date.now() + expiresMs),
    domain: isProd ? ".duyngo.com" : undefined,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
  };
};

export const cookiesOptionWithoutHttpOnly = (
  expiresMs?: number | null
): CookieOptions => {
  const isProd = process.env.NODE_ENV === "production";

  if (!expiresMs || expiresMs <= 0) {
    return {
      expires: new Date(0),
      domain: isProd ? ".duyngo.com" : undefined,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    };
  }

  return {
    maxAge: Math.floor(expiresMs / 1000),
    expires: new Date(Date.now() + expiresMs),
    domain: isProd ? ".duyngo.com" : undefined,
    secure: isProd,
    sameSite: "lax",
    path: "/",
  };
};
