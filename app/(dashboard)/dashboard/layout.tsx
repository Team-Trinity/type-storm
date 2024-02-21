
import NavBar from "@/components/shared/navbar/nav-bar";
import Sidebar from "@/components/shared/sidebar/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar/>
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}