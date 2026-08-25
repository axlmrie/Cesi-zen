import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { findFirstMock } = vi.hoisted(() => ({
  findFirstMock: vi.fn(),
}));

vi.mock("@/server/db", () => ({
  db: {
    user: {
      findFirst: findFirstMock,
    },
  },
}));

import { GET } from "@/app/api/health/route";

describe("health route", () => {
  beforeEach(() => {
    findFirstMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reports readiness after a minimal database query", async () => {
    vi.stubEnv("APP_VERSION", "1.2.3");
    findFirstMock.mockResolvedValue({ id: "user-id" });

    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(findFirstMock).toHaveBeenCalledWith({
      select: {
        id: true,
      },
    });
    await expect(response.json()).resolves.toEqual({
      service: "cesizen-frontend",
      status: "ok",
      version: "1.2.3",
    });
  });

  it("returns a generic 503 without leaking database errors", async () => {
    vi.stubEnv("APP_VERSION", "1.2.3");
    findFirstMock.mockRejectedValue(
      new Error(
        "mysql://admin:secret@database.internal/cesizen connection refused",
      ),
    );

    const response = await GET();
    const body = await response.text();

    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(JSON.parse(body)).toEqual({
      service: "cesizen-frontend",
      status: "unavailable",
      version: "1.2.3",
    });
    expect(body).not.toContain("secret");
    expect(body).not.toContain("database.internal");
    expect(body).not.toContain("connection refused");
  });
});
