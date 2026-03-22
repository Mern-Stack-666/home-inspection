import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";

export default function MarketingLayout({ children }) {
  return (
    <>
      <SiteNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
