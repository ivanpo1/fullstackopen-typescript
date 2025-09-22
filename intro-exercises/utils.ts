export const isNotNumber = (argument: never): boolean =>
    isNaN(Number(argument));