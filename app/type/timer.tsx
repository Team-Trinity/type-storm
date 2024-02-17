import { useCallback, useEffect, useState } from "react";
import { cn } from "../_lib/utils";

export default function Timer({
    isTyping,
    typedLetters,
    correctLetters,
    className
}: {
    isTyping: boolean;
    typedLetters: string;
    correctLetters: string[];
    className: string;
}) {
    const [timePassed, setTimePassed] = useState(0);

    const mistakeCalculator = useCallback(() => {
        let mistake = 0;

        for (let i = 0; i < typedLetters.length; i++) {
            if (correctLetters[i] !== typedLetters[i]) {
                mistake++;
            }
        }

        return mistake;
    }, [typedLetters, correctLetters]);

    useEffect(() => {
        if (isTyping) {
            setInterval(() => {
                setTimePassed((oldTime) => oldTime + 1);
            }, 1000);
        }
    }, [isTyping]);
    return <div className={cn(className)}>Speed : {timePassed}</div>;
}
