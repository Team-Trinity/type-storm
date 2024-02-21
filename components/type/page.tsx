"use client";
import TimerProvider from "@/providers/timerProvider";
import TypeBox from "./typeBox";

export default function page() {
    return (
        <div>
            <TimerProvider>
                <TypeBox />
            </TimerProvider>
        </div>
    );
}
