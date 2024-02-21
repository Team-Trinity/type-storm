import useText from "@/hooks/useText";
import {
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

type contexType = {
    setText: Dispatch<SetStateAction<string>>;
    timeRef: MutableRefObject<NodeJS.Timeout | undefined>;
    // Could not figure out the type here. Using any temporarily
    inputRef: any;
    timePassed: number;
    isTyping: boolean;
    isRunning: boolean;
    setIsTyping: Dispatch<SetStateAction<boolean>>;
    setIsRunning: Dispatch<SetStateAction<boolean>>;
    mistake: number;
    setMistake: Dispatch<SetStateAction<number>>;
    resetTimer: () => void;
    letters: string[];
    typedLetters: string;
    setTypedLetters: Dispatch<SetStateAction<string>>;
    text: string;
    pointer: number;
    wpmCalculator: () => number;
    accuracy: () => number;
};

export const timerContext = createContext<contexType>({
    setText: () => {},
    timeRef: { current: undefined }, // Default value for MutableRefObject
    inputRef: { current: undefined }, // Default value for MutableRefObject
    timePassed: 0,
    isTyping: false,
    isRunning: false,
    setIsTyping: () => {}, // Empty function as default
    setIsRunning: () => {}, // Empty function as default
    mistake: 0,
    setMistake: () => {},
    resetTimer: () => {}, // Empty function as default
    letters: [""],
    typedLetters: "",
    setTypedLetters: () => {}, // Empty function as default
    text: "",
    pointer: -1,
    wpmCalculator: () => {
        return 0;
    },
    accuracy: () => {
        return 0;
    }
});

const TimerProvider = ({ children }: { children?: ReactNode }) => {
    const [getText] = useText();

    const [text, setText] = useState("");
    const [timePassed, setTimePassed] = useState(0);
    const timeRef = useRef<NodeJS.Timeout>();
    const [isTyping, setIsTyping] = useState(false);
    const [typedLetters, setTypedLetters] = useState("");
    const [pointer, setPointer] = useState(-1);
    const inputRef = useRef<HTMLInputElement>();
    const [isRunning, setIsRunning] = useState(false);
    const [mistake, setMistake] = useState(0);

    const correctLetters = text.split("");
    const words = text.split(" ");

    const accuracy = useCallback(() => {
        const totalTyped = typedLetters.length;
        if (totalTyped) {
            return parseFloat(
                (((totalTyped - mistake) / totalTyped) * 100).toFixed(2)
            );
        } else {
            return 0;
        }
    }, [typedLetters, mistake]);

    const wpmCalculator = useCallback(() => {
        const letterPerMinute =
            ((typedLetters.length - mistake) / timePassed) * 60;
        const avgWordLength = correctLetters.length / words.length;
        if (timePassed > 0) {
            return Math.floor(letterPerMinute / avgWordLength);
        } else {
            return 0;
        }
    }, [
        typedLetters,
        timePassed,
        correctLetters.length,
        words.length,
        mistake
    ]);

    useEffect(() => {
        if (isRunning) {
            timeRef.current = setInterval(() => {
                // Store the interval reference
                setTimePassed((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            // Clear the interval if typing stops
            clearInterval(timeRef.current);
        }

        // Clear interval on unmount
        return () => {
            clearInterval(timeRef.current);
        };
    }, [isRunning]);

    useEffect(() => {
        setPointer(typedLetters.length - 1);
    }, [typedLetters.length]);

    function endGame() {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        setIsRunning(false);
        setIsTyping(false);
        setTimePassed(0);
        clearInterval(timeRef.current);
        setTypedLetters("");
    }

    function resetTimer() {
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
        setIsRunning(false);
        setIsTyping(false);
        setTimePassed(0);
        clearInterval(timeRef.current);
        setTypedLetters("");
        setMistake(0);
    }
    return (
        <timerContext.Provider
            value={{
                setText,
                timeRef,
                inputRef,
                timePassed,
                isTyping,
                isRunning,
                setIsTyping,
                setIsRunning,
                mistake,
                setMistake,
                resetTimer,
                letters: correctLetters,
                text,
                typedLetters,
                setTypedLetters,
                pointer,
                wpmCalculator,
                accuracy
            }}
        >
            {children}
        </timerContext.Provider>
    );
};

export default TimerProvider;
