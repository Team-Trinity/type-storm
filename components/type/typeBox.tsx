"use client";

import useText from "@/hooks/useText";
import { cn } from "@/lib/utils";
import { TypeStateContext } from "@/providers/TypeStateProvider";
import clsx from "clsx";
import { ChevronRight, RotateCcw } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import { useContext, useEffect } from "react";
import { Separator } from "../ui/separator";
import Letter from "./letterElement";
import TextSelector from "./textSelector";

const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"] });

export default function TypeBox() {
    const { state, dispatch, inputRef, resetTimer } =
        useContext(TypeStateContext);

    const [getText] = useText();
    useEffect(() => {
        dispatch({ type: "set text", payload: 20 });
    }, []);

    useEffect(() => {
        if (state.isRunning) {
            let typingTimer: NodeJS.Timeout;

            // Function to handle typing start
            const handleTypingStart = () => {
                dispatch({ type: "set typing", payload: true });
            };

            // Function to handle typing end
            const handleTypingEnd = () => {
                dispatch({ type: "set typing", payload: false });
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
    }, [state.isRunning]); // Empty dependency array to ensure the effect runs only once

    function changeHandler(value: string) {
        // Dirty code here. Some issue with useState not syncing properly thats why had to +1 the typed.length
        if (state.typedLetters.length + 1 >= state.currentText.length) {
            dispatch({ type: "set running", payload: false });
        } else if (state.typedLetters.length > 0 && !state.isRunning) {
            dispatch({ type: "set running", payload: true });
        }

        console.log(value);
        dispatch({ type: "set typed", payload: value });
        console.log("TYPED", value);
        console.log("TYPING....", state.isTyping);
    }

    function resetHandler() {
        resetTimer();
    }
    function nextHandler() {
        dispatch({
            type: "set text",
            payload: state.currentText.split(" ").length
        });
        resetTimer();
    }

    return (
        <div className="mx-auto flex w-[calc(100vw*0.7)] flex-col items-center justify-center gap-10 transition-all">
            <TextSelector />
            <div className="flex w-full flex-col items-center justify-center gap-2">
                <div className="flex w-full items-center justify-around">
                    <div className="text-center text-2xl">
                        {state.timePassed}
                        <span className="text-lg"> s</span>
                    </div>
                    <div className="text-center text-2xl">
                        {state.wpmCount}
                        <span className="text-lg"> WPM</span>
                    </div>
                </div>
                <div className="flex w-full items-center justify-around">
                    <div className="text-center text-2xl">
                        {state.typedLetters.length}/{state.currentText.length}
                    </div>
                    <div className="text-center text-2xl">
                        {state.accuracy}%{" "}
                        <span className="text-lg">accuracy</span>
                        {/* {mistake} <span className="text-lg">mistakes</span> */}
                    </div>
                </div>
            </div>
            <Separator />
            <div
                className={cn(
                    "relative w-full p-5 text-xl font-semibold tracking-tighter transition-all",
                    jetbrains_mono.className
                    // { "border border-red-200": isTyping }
                )}
            >
                <span
                    className={clsx({
                        "animate-blinkingCursor": !state.isTyping,
                        invisible: state.typedLetters.length !== 0
                    })}
                >
                    |
                </span>
                <span>
                    {state.currentText.split("").map((letter, index) => {
                        return (
                            <Letter
                                key={index}
                                correctLetter={letter}
                                typedLetter={state.typedLetters[index]}
                                isActive={
                                    state.typedLetters.length - 1 === index
                                }
                                isLast={index === state.currentText.length - 1}
                            />
                        );
                    })}
                </span>
                {inputRef && (
                    <input
                        autoFocus
                        maxLength={state.currentText.length}
                        type="text"
                        ref={inputRef}
                        disabled={
                            state.typedLetters.length > 1 &&
                            // Check if the last typed letter is correct or not then disable it
                            state.typedLetters.slice(-1) ===
                                state.currentText.slice(-1) &&
                            !state.isRunning
                        }
                        name="type-input"
                        className="absolute left-0 top-0 z-50 h-full w-full opacity-0"
                        onChange={(e) => changeHandler(e.target.value)}
                    />
                )}
            </div>
            <div className="flex w-full items-center justify-center gap-20">
                <div className="flex flex-col items-center justify-center gap-1">
                    <RotateCcw
                        onClick={resetHandler}
                        className="cursor-pointer "
                    />
                    <h3 className="text-sm">Reset</h3>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <ChevronRight
                        onClick={nextHandler}
                        className="cursor-pointer "
                    />
                    <h3 className="text-sm">Next</h3>
                </div>
            </div>
        </div>
    );
}
