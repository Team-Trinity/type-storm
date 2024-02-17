import { useCallback, useEffect, useState } from "react";
import { cn } from "../_lib/utils";

export default function Timer({
    isTyping,
    typedLetters,
    text,
    className
}: {
    isTyping: boolean;
    typedLetters: string;
    text: string;
    className: string;
}) {
    const [timePassed, setTimePassed] = useState(0);
    const [wpm, setWpm] = useState(0);

    const correctLetters = text.split("");
    const words = text.split(" ");

    const mistakeCalculator = useCallback(() => {
        let mistake = 0;

        for (let i = 0; i < typedLetters.length; i++) {
            if (correctLetters[i] !== typedLetters[i]) {
                mistake++;
            }
        }

        return mistake;
    }, [typedLetters, correctLetters]);

    const wpmCalculator = useCallback(() => {
        const letterPerMinute =
            ((typedLetters.length - mistakeCalculator()) / timePassed) * 60;
        const avgWordLength = correctLetters.length / words.length;
        return Math.floor(letterPerMinute / avgWordLength);
    }, [
        typedLetters,
        mistakeCalculator,
        timePassed,
        correctLetters.length,
        words.length
    ]);

    useEffect(() => {
        if (isTyping) {
            setInterval(() => {
                setTimePassed((oldTime) => oldTime + 1);
            }, 1000);
        }
    }, [isTyping]);
    return (
        <>
            <div className={cn(className)}>Timer : {timePassed}s</div>
            <div className={cn(className)}>
                WPM : {wpmCalculator() ? wpmCalculator() : 0}
            </div>
        </>
    );
}
