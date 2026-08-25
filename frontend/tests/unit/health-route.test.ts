import { describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/health/route";

describe("health route", () => {
  it("reports application health without requiring a database", async () => {
    vi.stubEnv("APP_VERSION", "1.2.3");

    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({
      service: "cesizen-frontend",
      status: "ok",
      version: "1.2.3",
    });

    vi.unstubAllEnvs();
  });
});
