"use client";

import clsx from "clsx";
import { RotateCcw } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import TimerProvider, { timerContext } from "../_providers/timerProvider";
import Letter from "./letterElement";
import TextSelector from "./textSelector";
import useText from "@/hooks/useText";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"] });

export default function TypeBox() {
    const {
        isTyping,
        setIsTyping,
        resetTimer,
        letters,
        typedLetters,
        setTypedLetters,
        pointer,
        timePassed,
        wpmCalculator,
        setText,
        inputRef
    } = useContext(timerContext);

    const [getText] = useText();
    useEffect(() => {
        setText(getText(20));
    }, []);

    function changeHandler(value: string) {
        // Dirty code here. Some issue with useState not syncing properly thats why had to +1 the typed.length
        if (typedLetters.length + 1 >= letters.length) {
            setIsTyping(false);
        } else if (!isTyping) {
            setIsTyping(true);
        }

        console.log(value);
        setTypedLetters(value);
        console.log("TYPED", value);
    }

    function resetHandler() {
        resetTimer();
    }

    return (
        <div className="mx-auto mt-60 flex w-[calc(100vw*0.7)] flex-col items-center justify-center gap-10 transition-all">
            <TextSelector />
            <div className=" flex w-full items-center justify-around">
                <div className="text-center text-2xl">
                    Timer : {timePassed}s
                </div>
                <div className="text-center text-2xl">
                    WPM : {wpmCalculator()}
                </div>
            </div>
            <div
                className={cn(
                    "relative w-full p-5 text-lg font-semibold transition-all",
                    jetbrains_mono.className
                )}
            >
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
                                typedLetter={typedLetters[index]}
                                isActive={pointer === index}
                                isTyping={isTyping}
                            />
                        );
                    })}
                </span>
                {inputRef && (
                    <input
                        autoFocus
                        type="text"
                        ref={inputRef}
                        name="type-input"
                        className="absolute left-0 top-0 z-50 h-full w-full opacity-0"
                        onChange={(e) => changeHandler(e.target.value)}
                    />
                )}
            </div>
            <RotateCcw
                onClick={resetHandler}
                className="cursor-pointer text-white"
            />
        </div>
    );
}
