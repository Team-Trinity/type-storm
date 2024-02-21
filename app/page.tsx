"use client";

import TypeBox from "@/components/type/typeBox";
import TimerProvider from "@/providers/timerProvider";

export default function Home() {
    return (
        <div>
            <TimerProvider>
                <TypeBox />
            </TimerProvider>
        </div>
    );
}
