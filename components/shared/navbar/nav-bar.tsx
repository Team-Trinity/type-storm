"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/ui/themeToggleButton";
import { UserNav } from "@/components/ui/user-nav";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";

import { useContext } from "react";

const NavBar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <nav className="mb-20 flex items-center border-b px-10 py-6">
                <div className="flex-grow">
                    {/* <img src="/Logo.svg" alt="navigateui logo" /> */}
                    <Link href={"/"}>
                        <h1 className="cursor-pointer text-xl font-semibold">
                            Key Storm
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center justify-between gap-8">
                    <ul className="flex items-center justify-between gap-10">
                        <Link href={"/"}>
                            <li className="cursor-pointer hover:text-sky-500">
                                Home
                            </li>
                        </Link>
                        <Link href={"/about-us"}>
                            <li className="cursor-pointer hover:text-sky-500">
                                About Us
                            </li>
                        </Link>
                    </ul>
                    {user ? (
                        <UserNav />
                    ) : (
                        <>
                            <Link href={"/login"}>
                                <Button className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                                    Login
                                </Button>
                            </Link>
                            <Link href={"/register"}>
                                <Button className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}
                    <ThemeToggleButton />
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
