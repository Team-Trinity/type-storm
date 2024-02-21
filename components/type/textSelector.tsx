import { useContext, useRef, useState } from "react";
import { timerContext } from "@/providers/timerProvider";
import useText from "@/hooks/useText";
import { cn } from "@/lib/utils";

export default function TextSelector() {
    const { setText, resetTimer, inputRef } = useContext(timerContext);
    const [getText] = useText();
    const [selected, setSelected] = useState(0);
    const selectorRef = useRef();

    const wordCount = [20, 60, 80, 100];
    return (
        <div className="flex items-center justify-center gap-10 text-lg">
            <h3>Word Count :</h3>
            <div className="flex items-center justify-center gap-5 text-gray-500">
                {wordCount.map((count, index) => {
                    return (
                        <div
                            key={index}
                            onClick={(e) => {
                                setSelected(index);
                                setText(getText(count));
                                resetTimer();
                                if (inputRef.current) {
                                    inputRef.current.focus();
                                }
                            }}
                            className={cn(
                                {
                                    "current-word-count": index === selected
                                },
                                "cursor-pointer hover:text-gray-400"
                            )}
                        >
                            {count}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
