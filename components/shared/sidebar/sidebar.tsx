"use client";

import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/AuthProvider";
import { Link } from "@radix-ui/react-navigation-menu";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Sidebar() {
    const router = useRouter();
    return (
        <nav className={cn(`relative hidden h-screen w-72 border-r lg:block`)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <h2
                            className="mb-2 cursor-pointer px-4 text-xl font-semibold tracking-tight pb-2 hover:underline"
                            onClick={() => router.push("/dashboard")}
                        >
                            Overview
                        </h2>
                        <h2
                            className="mb-2 cursor-pointer px-4 text-xl font-semibold tracking-tight pb-2 hover:underline"
                            onClick={() => router.push("/dashboard/profile")}
                        >
                            {/* <Link href="/dashboard/profile">Profile</Link> */}
                            Profile
                        </h2>
                        <h2
                            className="mb-2 cursor-pointer px-4 text-xl font-semibold tracking-tight pb-2 hover:underline"
                            onClick={() => router.push("/dashboard/high-scores")}
                        >
                            {/* <Link href="/dashboard/profile">Profile</Link> */}
                            High Scores
                        </h2>
                        {/* <h2
                            className="mb-2 cursor-pointer px-4 text-xl font-semibold tracking-tight"
                            onClick={() => router.push("/")}
                        >
                            Log Out
                        </h2> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}
