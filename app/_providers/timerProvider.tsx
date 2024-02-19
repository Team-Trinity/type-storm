import useText from "@/hooks/useText";
import {
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
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
    setIsTyping: Dispatch<SetStateAction<boolean>>;
    resetTimer: () => void;
    letters: string[];
    typedLetters: string;
    setTypedLetters: Dispatch<SetStateAction<string>>;
    text: string;
    pointer: number;
    wpmCalculator: () => number;
};

export const timerContext = createContext<contexType>({
    setText: () => {},
    timeRef: { current: undefined }, // Default value for MutableRefObject
    inputRef: { current: undefined }, // Default value for MutableRefObject
    timePassed: 0,
    isTyping: false,
    setIsTyping: () => {}, // Empty function as default
    resetTimer: () => {}, // Empty function as default
    letters: [""],
    typedLetters: "",
    setTypedLetters: () => {}, // Empty function as default
    text: "",
    pointer: -1,
    wpmCalculator: () => {
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
        if (timePassed > 0) {
            return Math.floor(letterPerMinute / avgWordLength);
        } else {
            return 0;
        }
    }, [
        typedLetters,
        mistakeCalculator,
        timePassed,
        correctLetters.length,
        words.length
    ]);

    useEffect(() => {
        if (isTyping) {
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
    }, [isTyping]);

    useEffect(() => {
        setPointer(typedLetters.length - 1);
    }, [typedLetters.length]);

    function resetTimer() {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        setIsTyping(false);
        setTimePassed(0);
        clearInterval(timeRef.current);
        setTypedLetters("");
    }
    return (
        <timerContext.Provider
            value={{
                setText,
                timeRef,
                inputRef,
                timePassed,
                isTyping,
                setIsTyping,
                resetTimer,
                letters: correctLetters,
                text,
                typedLetters,
                setTypedLetters,
                pointer,
                wpmCalculator
            }}
        >
            {children}
        </timerContext.Provider>
    );
};

export default TimerProvider;
