export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      service: "cesizen-frontend",
      status: "ok",
      version: process.env.APP_VERSION ?? "development",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
