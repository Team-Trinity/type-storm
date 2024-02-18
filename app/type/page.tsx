"use client";
import TimerProvider from "../_providers/timerProvider";
import TypeBox from "./typeBox";

export default function page() {
    return (
        <div>
            <TimerProvider>
                <TypeBox/>
            </TimerProvider>
        </div>
    );
}
