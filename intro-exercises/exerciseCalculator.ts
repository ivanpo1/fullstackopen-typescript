import { isNotNumber } from "./utils";

interface exerciseHours {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

interface exerciseValues {
    target: number,
    hoursTrained: number[]
}

const getRatingText = (averageHours: number): string => {
    if (averageHours < 1.5) {
        return 'You tried your best'
    }

    if (averageHours < 2.5) {
        return 'Cool beans'
    }

    return 'Jean Claude Van Who?'
}

const getRating = (averageHours: number): number => {
    if (averageHours < 1.5) return 1
    if (averageHours < 2.5) return 2
    return 3
}

const parseArgumentsExercise = (args: string[]): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments')

    const hoursArgs: string[] = args.slice(3)
    const hoursNumbers: number[] = hoursArgs.map(hour => {
        const numHour = Number(hour)
        if (isNotNumber(numHour)) {
            throw new Error('Argument is not a number')
        }
        if (numHour < 0) {
            throw new Error('Cant be negative')
        }
        return numHour
    })

    if (isNotNumber(args[2])) {
        throw new Error ('Target is not a number')
    }

    return {
        target: Number(args[2]),
        hoursTrained: hoursNumbers
    }
}


const calculateExercises = (targetHours: number, hoursTrained: number[]): exerciseHours => {
    const average = hoursTrained.reduce((a, b) => a + b) / hoursTrained.length

    return {
        periodLength: hoursTrained.length,
        trainingDays: hoursTrained.reduce((a, b) => a + (b > 0 ? 1 : 0), 0),
        success: average >= targetHours,
        rating: getRating(average),
        ratingDescription: getRatingText(average),
        target: targetHours,
        average: average
    }
}

try {
    const {target, hoursTrained} = parseArgumentsExercise(process.argv)
    console.log(calculateExercises(target, hoursTrained))
} catch (error: unknown) {
    let errorMessage = 'Error: '
    if (error instanceof Error) {
        errorMessage += error.message
    }
    console.log(errorMessage)
}
