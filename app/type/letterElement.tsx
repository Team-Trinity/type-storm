import clsx from "clsx";
import { useContext } from "react";
import { timerContext } from "../_providers/timerProvider";

export default function LetterElement({
    correctLetter,
    typedLetter,
    isActive,
    isLast
}: {
    typedLetter: string;
    correctLetter: string;
    isActive: boolean;
    isLast: boolean;
}) {
    // console.log(correctLetter, isLast);
    const { isTyping } = useContext(timerContext);
    return (
        <>
            {typedLetter && typedLetter !== correctLetter ? (
                <span className="text-red-400 underline">
                    <span>
                        {correctLetter}
                        <span
                            className={clsx({
                                "animate-none": isTyping,
                                "animate-blinkingCursor": !isLast,
                                invisible: !isActive
                            })}
                        >
                            |
                        </span>
                    </span>
                </span>
            ) : (
                <span
                    className={`${typedLetter && correctLetter === typedLetter ? "text-green-300" : "text-gray-500"}`}
                >
                    <span>
                        {correctLetter}
                        <span
                            className={clsx({
                                "animate-none": isTyping,
                                "animate-blinkingCursor": !isLast,
                                invisible: !isActive
                            })}
                        >
                            |
                        </span>
                    </span>
                </span>
            )}
        </>
    );
}
