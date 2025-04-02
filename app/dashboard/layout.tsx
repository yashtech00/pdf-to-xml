import { ComponentWrapper } from "@/components/globals/components-wrapper";
import { SidebarProvider } from "@/contexts/sidebar-context";
import type { Metadata } from "next";
import { DashboardNavbar } from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: "Pdf to XML",
  description:
    "Convert PDF files to XML format easily and quickly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex bg-[#090909] h-screen overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="md:hidden block">
            <DashboardNavbar />
          </div>
          <main className="flex-1 bg-[#090909] p-2 overflow-y-auto">
            <ComponentWrapper>{children}</ComponentWrapper>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
