"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/ui/themeToggleButton";
import { UserNav } from "@/components/ui/user-nav";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

import React, { useContext } from "react";

const NavBar = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    return (
        <div>
            <nav className="mb-20 flex items-center border-b px-10 py-8">
                <div className="flex-grow">
                    {/* <img src="/Logo.svg" alt="navigateui logo" /> */}
                    <h1
                        className="cursor-pointer text-xl font-semibold"
                        onClick={() => router.push("/")}
                    >
                        Key Storm
                    </h1>
                </div>
                <div className="flex items-center justify-between gap-8">
                    <ul className="flex items-center justify-between gap-10">
                        <li
                            className="cursor-pointer hover:text-sky-500"
                            onClick={() => router.push("/")}
                        >
                            Home
                        </li>
                        <li
                            className="cursor-pointer hover:text-sky-500"
                            onClick={() => router.push("/about-us")}
                        >
                            About Us
                        </li>
                    </ul>
                    {user ? (
                        <UserNav></UserNav>
                    ) : (
                        <>
                            <Button
                                onClick={() => router.push("/login")}
                                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => router.push("register")}
                                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Register
                            </Button>
                        </>
                    )}
                    <ThemeToggleButton />
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
