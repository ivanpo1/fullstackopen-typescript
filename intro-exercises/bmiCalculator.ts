import { isNotNumber } from "./utils"

interface bmiValues {
    height: number,
    weight: number
}

const parseArguments = (args: string[]) : bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
        if (Number(args[2]) <= 0 || Number(args[3]) <= 0) {
            throw new Error('Numbers are not valid')
        }

        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values are not numbers')
    }
}

const calculateBmi = (height: number, weight: number) : string => {
    const heightInMeters = height / 100
    const result = weight / (heightInMeters * heightInMeters)

    if (result < 18.5) return 'Underweight'
    if (result >= 18.5 && result < 25) return 'Normal range'
    if (result >= 25 && result < 30) return 'Overweight'
    if (result >= 30) return 'Obese'
}

try {
    const { height, weight } = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    let errorMessage = 'Error: '
    if (error instanceof Error) {
        errorMessage += error.message
    }
    console.log(errorMessage)
}