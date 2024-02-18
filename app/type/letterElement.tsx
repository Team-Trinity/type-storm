import clsx from "clsx";
import { cn } from "../_lib/utils";

export default function LetterElement({
    correctLetter,
    typedLetter,
    isActive,
    isTyping
}: {
    typedLetter: string;
    correctLetter: string;
    isActive: boolean;
    isTyping: boolean;
}) {
    return (
        <>
            {typedLetter && typedLetter !== correctLetter ? (
                <span className="text-red-400 underline">
                    <span>
                        {correctLetter}
                        <span
                            className={clsx({
                                "animate-blinkingCursor": !isTyping,
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
                                "animate-blinkingCursor": !isTyping,
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
