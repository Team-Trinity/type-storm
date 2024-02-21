"use client";

import useText from "@/hooks/useText";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { RotateCcw } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import { useCallback, useContext, useEffect } from "react";
import { timerContext } from "@/providers/timerProvider";
import Letter from "./letterElement";
import TextSelector from "./textSelector";

const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"] });

export default function TypeBox() {
    const {
        isTyping,
        isRunning,
        setIsTyping,
        setIsRunning,
        resetTimer,
        letters,
        typedLetters,
        setTypedLetters,
        pointer,
        timePassed,
        wpmCalculator,
        setText,
        inputRef,
        accuracy,
        mistake
    } = useContext(timerContext);

    const [getText] = useText();
    useEffect(() => {
        setText(getText(20));
    }, []);

    useEffect(() => {
        if (isRunning) {
            let typingTimer: NodeJS.Timeout;

            // Function to handle typing start
            const handleTypingStart = () => {
                setIsTyping(true);
            };

            // Function to handle typing end
            const handleTypingEnd = () => {
                setIsTyping(false);
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    // Reset after 8 seconds of no typing
                    console.log("User stopped typing for 8 seconds.");
                    resetHandler();
                }, 5000);
            };

            // Event listeners for typing start and end
            document.addEventListener("keydown", handleTypingStart);
            document.addEventListener("keyup", handleTypingEnd);

            return () => {
                document.removeEventListener("keydown", handleTypingStart);
                document.removeEventListener("keyup", handleTypingEnd);
                clearTimeout(typingTimer);
            };
        }
    }, [isRunning]); // Empty dependency array to ensure the effect runs only once

    function changeHandler(value: string) {
        // Dirty code here. Some issue with useState not syncing properly thats why had to +1 the typed.length
        if (typedLetters.length + 1 >= letters.length) {
            setIsRunning(false);
        } else if (typedLetters.length > 0 && !isRunning) {
            setIsRunning(true);
        }

        console.log(value);
        setTypedLetters(value);
        console.log("TYPED", value);
        console.log("TYPING....", isTyping);
    }

    function resetHandler() {
        resetTimer();
    }

    return (
        <div className="mx-auto mt-60 flex w-[calc(100vw*0.7)] flex-col items-center justify-center gap-10 transition-all">
            <TextSelector />
            <div className="flex w-full flex-col items-center justify-center gap-2">
                <div className="flex w-full items-center justify-around">
                    <div className="text-center text-2xl">
                        {timePassed}
                        <span className="text-lg"> s</span>
                    </div>
                    <div className="text-center text-2xl">
                        {wpmCalculator()}
                        <span className="text-lg"> WPM</span>
                    </div>
                </div>
                <div className="flex w-full items-center justify-around">
                    <div className="text-center text-2xl">
                        {typedLetters.length}/{letters.length}
                    </div>
                    <div className="text-center text-2xl">
                        {accuracy()}% <span className="text-lg">accuracy</span>
                        {/* {mistake} <span className="text-lg">mistakes</span> */}
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    "relative w-full p-5 text-lg font-semibold transition-all",
                    jetbrains_mono.className
                    // { "border border-red-200": isTyping }
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
                                isLast={index === letters.length - 1}
                            />
                        );
                    })}
                </span>
                {inputRef && (
                    <input
                        autoFocus
                        maxLength={letters.length}
                        type="text"
                        ref={inputRef}
                        disabled={
                            typedLetters.length > 1 &&
                            // Check if the last typed letter is correct or not then disable it
                            typedLetters.slice(-1) === letters.slice(-1)[0] &&
                            !isRunning
                        }
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
