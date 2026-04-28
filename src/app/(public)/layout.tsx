import { NavbarPublic } from "@/components/NavbarPublic";
import { Footer } from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background selection:bg-brand/20 selection:text-brand-dark">
      <NavbarPublic />
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}