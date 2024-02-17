"use client";

import { useCallback, useEffect, useState } from "react";
import Letter from "./letter";
import clsx from "clsx";
import Timer from "./timer";

export default function Page() {
    const text =
        "I Leave Sisyphus at the foot of the mountain. One always finds one's burden again. But Sisyphus teaches the higher fidelity that negates the gods and raises rocks. He too concludes that all is well. This universe henceforth without a master seems to him neither sterile nor futile. Each atom of that stone, each mineral flake of that night-filled mountain, in itself, forms a world. The struggle itself toward the heights is enough to fill a man's heart. One must imagine Sisyphus happy.";
    const letters = text.split("");
    const words = text.split(" ");

    const [typed, setTyped] = useState("");
    const [pointer, setPointer] = useState(-1);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setPointer(typed.length - 1);
    }, [typed]);

    function changeHandler(value: string) {
        setIsTyping(true);
        console.log(value);
        setTyped(value);
        console.log("TYPED", value);
    }
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
            <div>
                {/* <h1 className="text-center text-2xl">
                    Typed letters : {typed.slice(-1)}
                </h1>
                <h1 className="text-center text-2xl">Pointer : {pointer}</h1> */}
                <h1 className="text-center text-2xl">
                    Letters Typed : {typed.length}
                </h1>
                <Timer
                    className="text-center text-2xl"
                    isTyping={isTyping}
                    typedLetters={typed}
                    correctLetters={letters}
                />
            </div>
            <div className="relative w-[1000px] p-5 text-xl transition-all">
                <span
                    className={clsx({
                        "animate-blinkingCursor": !isTyping,
                        invisible: pointer !== -1
                    })}
                >
                    |
                </span>
                <span className="tracking-tighter">
                    {letters.map((letter, index) => {
                        return (
                            <Letter
                                key={index}
                                correctLetter={letter}
                                typedLetter={typed[index]}
                                isActive={pointer === index}
                                isTyping={isTyping}
                            />
                        );
                    })}
                </span>
                <input
                    autoFocus
                    type="text"
                    name="type-input"
                    className="absolute left-0 top-0 z-50 h-full w-[1000px] opacity-0"
                    onChange={(e) => changeHandler(e.target.value)}
                />
            </div>
        </div>
    );
}
