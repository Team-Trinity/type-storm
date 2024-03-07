import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calculateAverage(array: number[]) {
    // Check if the array is empty
    if (array.length === 0) {
        return 0;
    }

    // Calculate the sum of all elements in the array
    const sum = array.reduce((acc, currentValue) => acc + currentValue, 0);

    // Calculate the average
    const average = sum / array.length;

    return average;
}
