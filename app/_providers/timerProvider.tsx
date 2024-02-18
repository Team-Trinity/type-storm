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
    timeRef: MutableRefObject<NodeJS.Timeout | undefined>;
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

const text =
    "The Matrix is a system, Neo. That system is our enemy. But when you're inside, you look around, what do you see? Businessmen, teachers, lawyers, carpenters. The very minds of the people we are trying to save. But until we do, these people are still a part of that system and that makes them our enemy. You have to understand, most of these people are not ready to be unplugged. And many of them are so inured, so hopelessly dependent on the system, that they will fight to protect it.";

export const timerContext = createContext<contexType>({
    timeRef: { current: undefined }, // Default value for MutableRefObject
    timePassed: 0,
    isTyping: false,
    setIsTyping: () => {}, // Empty function as default
    resetTimer: () => {}, // Empty function as default
    letters: text.split(""),
    typedLetters: "",
    setTypedLetters: () => {}, // Empty function as default
    text: text,
    pointer: -1,
    wpmCalculator: () => {
        return 0;
    }
});

const TimerProvider = ({ children }: { children?: ReactNode }) => {
    const [timePassed, setTimePassed] = useState(0);
    const timeRef = useRef<NodeJS.Timeout>();
    const [isTyping, setIsTyping] = useState(false);
    const [typedLetters, setTypedLetters] = useState("");
    const [pointer, setPointer] = useState(-1);

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
        setIsTyping(false);
        setTimePassed(0);
        clearInterval(timeRef.current);
        setTypedLetters("");
    }
    return (
        <timerContext.Provider
            value={{
                timeRef,
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
