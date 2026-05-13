import { NavbarPublic } from "@/components/NavbarPublic";
import { Footer } from "@/components/Footer";
import { db } from "@/server/db";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menus = await db.menu.findMany({
    orderBy: { ordreAffichage: "asc" },
    select: { label: true, url: true },
  });

  return (
    <div className="bg-background selection:bg-brand/20 selection:text-brand-dark relative flex min-h-screen flex-col">
      <NavbarPublic menus={menus} />
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
