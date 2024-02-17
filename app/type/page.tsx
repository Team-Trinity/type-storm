"use client";

import { useCallback, useEffect, useState } from "react";
import Letter from "./letter";
import clsx from "clsx";
import Timer from "./timer";

export default function Page() {
    const text = "Hello world yo";
    const letters = text.split("");
    const words = text.split(" ");

    const [typed, setTyped] = useState("");
    const [pointer, setPointer] = useState(-1);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setPointer(typed.length - 1);
    }, [typed, letters.length]);

    function changeHandler(value: string) {
        // Dirty code here. Some issue with useState not syncing properly thats why had to +1 the typed.length
        if (typed.length + 1 >= letters.length) {
            if (isTyping) {
                setIsTyping(false);
            }
        } else if (!isTyping) {
            setIsTyping(true);
        }

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
                    text={text}
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
