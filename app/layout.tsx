import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/footer/footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/themeProvider";
// import { NavBar } from "@/components/shared/Footer/NavBar";
import AuthProvider from "@/providers/AuthProvider";
import NavBar from "@/components/shared/navbar/nav-bar";
import TypeStateProvider from "@/providers/TypeStateProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Type Storm",
    description: "A touch typing practice and speed checking website"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "flex min-h-screen flex-col bg-background font-sans antialiased",
                    inter.className
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TypeStateProvider>
                        <AuthProvider>
                            <NavBar />{" "}
                            <main className="flex-grow">{children}</main>
                            <Footer />
                        </AuthProvider>
                    </TypeStateProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
