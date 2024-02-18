"use client";

import clsx from "clsx";
import { RotateCcw } from "lucide-react";
import { useContext, useRef } from "react";
import TimerProvider, { timerContext } from "../_providers/timerProvider";
import Letter from "./letterElement";

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
        wpmCalculator
    } = useContext(timerContext);

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

    const inputRef = useRef<HTMLInputElement>(null);

    function resetHandler() {
        // Resetting the input tag
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        resetTimer();
    }

    return (
        <TimerProvider>
            <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
                <div>
                    {/* <h1 className="text-center text-2xl">
                    Typed letters : {typed.slice(-1)}
                </h1>
                <h1 className="text-center text-2xl">Pointer : {pointer}</h1> */}
                    <h1 className="text-center text-2xl">
                        Letters Typed : {typedLetters.length}
                    </h1>
                    <div className="text-center text-2xl">
                        Timer : {timePassed}s
                    </div>
                    <div className="text-center text-2xl">
                        WPM : {wpmCalculator()}
                    </div>
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
                                    typedLetter={typedLetters[index]}
                                    isActive={pointer === index}
                                    isTyping={isTyping}
                                />
                            );
                        })}
                    </span>
                    <input
                        autoFocus
                        type="text"
                        ref={inputRef}
                        name="type-input"
                        className="absolute left-0 top-0 z-50 h-full w-[1000px] opacity-0"
                        onChange={(e) => changeHandler(e.target.value)}
                    />
                </div>
                <RotateCcw
                    onClick={resetHandler}
                    className="cursor-pointer text-white"
                />
            </div>
        </TimerProvider>
    );
}
