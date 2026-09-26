import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen" cz-shortcut-listen="true">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
