"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/ui/themeToggleButton";
import { useRouter } from "next/navigation";

import React from "react";

const NavBar = () => {
    const router = useRouter();
    return (
        <div>
            <nav className="flex items-center px-10 py-8">
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
                        <li className="cursor-pointer hover:text-sky-500">
                            Statics
                        </li>
                    </ul>
                    <Button onClick={() => router.push("/login")}>Login</Button>
                    <Button onClick={() => router.push("register")}>
                        Register
                    </Button>
                    <ThemeToggleButton />
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
