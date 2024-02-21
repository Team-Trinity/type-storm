"use client";

import * as React from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function NavBar() {
    return (
        <div className="container mx-auto">
            <NavigationMenu>
                <NavigationMenuList className="flex justify-between">
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            Key Storm
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <Button variant="outline"><Link href="/login" legacyBehavior passHref>
                           Login
                        </Link></Button>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
