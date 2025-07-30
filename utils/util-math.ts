export const interpolateRange = (
    input: number,
    inputMin: number,
    inputMax: number,
    outputMin: number,
    outputMax: number,
    invert: boolean = false
): number => {
    // Clamp input between inputMin and inputMax
    const clamped = Math.max(inputMin, Math.min(inputMax, input))
    const t = (clamped - inputMin) / (inputMax - inputMin)
    if (invert) {
        // Invert the interpolation direction
        return outputMax - (outputMax - outputMin) * t
    } else {
        return outputMin + (outputMax - outputMin) * t
    }
};