function trackFinger(event) {
    return {
        x: event.clientX,
        y: event.clientY,
    };
}

function valueToPercent(value, min, max) {
    return ((value - min) * 100) / (max - min);
}

function percentToValue(percent, min, max) {
    return (max - min) * percent + min;
}

function roundValueToStep(value, step, min) {
    const nearest = Math.round((value - min) / step) * step + min;
    return nearest;
}

function clamp(value, min, max) {
    return Math.min(Math.max(min, value), max);
}

function findClosest(values, currentValue) {
    const valuesReduce = values.reduce(function (acc, value, index) {
            const distance = Math.abs(currentValue - value);

            if (
                acc === null ||
                distance < acc.distance ||
                distance === acc.distance
            ) {
                return {
                    distance: distance,
                    index: index,
                };
            }

            return acc;
        }, null),
        closestIndex = valuesReduce.index;

    return closestIndex;
}

function setValueIndex({ values, source, newValue, index }) {
    if (values[index] === newValue) {
        return source;
    }

    const output = values.slice();
    output[index] = newValue;
    return output;
}

module.exports = {
    trackFinger,
    valueToPercent,
    percentToValue,
    roundValueToStep,
    clamp,
    findClosest,
    setValueIndex,
};
