import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Sidebar() {
    return (
        <nav className={cn(`relative hidden h-screen w-56 border-r lg:block`)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {/* <Link href={"/dashboard"}>
                            <h2 className="mb-2 cursor-pointer px-4 pb-2 text-xl font-semibold tracking-tight hover:underline">
                                Overview
                            </h2>
                        </Link> */}
                        <Link href={"/dashboard"}>
                            <h2 className="mb-2 cursor-pointer px-4 pb-2 text-xl font-semibold tracking-tight hover:underline">
                                {/* <Link href="/dashboard/profile">Profile</Link> */}
                                Profile
                            </h2>
                        </Link>
                        <Link href={"/dashboard/high-scores"}>
                            <h2 className="mb-2 cursor-pointer px-4 pb-2 text-xl font-semibold tracking-tight hover:underline">
                                {/* <Link href="/dashboard/profile">Profile</Link> */}
                                High Scores
                            </h2>
                        </Link>
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
