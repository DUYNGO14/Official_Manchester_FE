// accessTokenManager.ts

class AccessTokenManager {
  private token: string | null = null;
  private expiredAt: number = 0; // epoch seconds

  constructor() {
    if (typeof window !== "undefined") {
      const savedToken = sessionStorage.getItem("access_token");
      const savedExp = sessionStorage.getItem("access_token_expired_at");
      if (savedToken) this.token = savedToken;
      if (savedExp) this.expiredAt = parseInt(savedExp, 10);
    }
  }

  save(newToken: string, exp: string | number) {
    const expSeconds =
      typeof exp === "string"
        ? Math.floor(new Date(exp).getTime() / 1000)
        : exp;

    if (typeof window !== "undefined") {
      sessionStorage.setItem("access_token", newToken);
      sessionStorage.setItem("access_token_expired_at", expSeconds.toString());
    }

    this.token = newToken;
    this.expiredAt = expSeconds;
  }

  clear() {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token_expired_at");
    }
    this.token = null;
    this.expiredAt = 0;
  }

  getToken(): string | null {
    return this.token;
  }

  getExpiredAt(): number {
    return this.expiredAt;
  }

  isExpired(thresholdSeconds = 30): boolean {
    if (!this.expiredAt) return true;
    const now = Math.floor(Date.now() / 1000);
    return now >= this.expiredAt - thresholdSeconds;
  }
}

// Singleton instance
const accessTokenManager = new AccessTokenManager();
export default accessTokenManager;
