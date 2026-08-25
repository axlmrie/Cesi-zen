import { db } from "@/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = {
    service: "cesizen-frontend",
    version: process.env.APP_VERSION ?? "development",
  };

  try {
    await db.user.findFirst({
      select: {
        id: true,
      },
    });

    return Response.json(
      {
        ...response,
        status: "ok",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return Response.json(
      {
        ...response,
        status: "unavailable",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
