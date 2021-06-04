const {
    trackFinger,
    valueToPercent,
    percentToValue,
    roundValueToStep,
    clamp,
    findClosest,
    setValueIndex,
} = require('./rangeUtils');

describe('trackFinger', () => {
    test('should response object with clientX and clientY', () => {
        const event = { clientX: 20, clientY: 10 };
        const result = trackFinger(event);
        expect(result).toStrictEqual({ x: 20, y: 10 });
    });
});

describe('valueToPercent', () => {
    test('should answer with the percentage 20', () => {
        const value = 20,
            min = 0,
            max = 100;

        const result = valueToPercent(value, min, max);
        expect(result).toBe(20);
    });

    test('should answer with negative number -20', () => {
        const value = -20,
            min = 0,
            max = 100;

        const result = valueToPercent(value, min, max);
        expect(result).toBe(-20);
    });
});

describe('percentToValue', () => {
    test('should answer with the value 1', () => {
        const percent = 0,
            min = 1,
            max = 100;

        const result = percentToValue(percent, min, max);
        expect(result).toBe(1);
    });
});

describe('roundValueToStep', () => {
    test('should round down', () => {
        const value = 0.4,
            step = 1,
            min = 1;

        const result = roundValueToStep(value, step, min);
        expect(result).toBe(0);
    });

    test('should round up', () => {
        const value = 0.6,
            step = 1,
            min = 1;

        const result = roundValueToStep(value, step, min);
        expect(result).toBe(1);
    });

    test('should round up', () => {
        const value = 0.5,
            step = 1,
            min = 1;

        const result = roundValueToStep(value, step, min);
        expect(result).toBe(1);
    });
});

describe('clamp', () => {
    test('should limit the result to the minimum', () => {
        const value = -10,
            min = 1,
            max = 100;

        const result = clamp(value, min, max);
        expect(result).toBe(1);
    });

    test('should limit the result to the maximum', () => {
        const value = 2000,
            min = 1,
            max = 100;

        const result = clamp(value, min, max);
        expect(result).toBe(100);
    });
});

describe('findClosest', () => {
    test('searches for the closest array element in the marks', () => {
        const currentValue = 6;
        const marksValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

        const result = findClosest(marksValues, currentValue);
        expect(result).toBe(1);
    });

    test('searches for the closest array element in the marks, checking fit back', () => {
        const currentValue = 1.4;
        const marksValues = [1, 2, 3, 4, 5, 6];

        const result = findClosest(marksValues, currentValue);
        expect(result).toBe(0);
    });

    test('searches for the closest array element in the marks, checking fit next', () => {
        const currentValue = 1.5;
        const marksValues = [1, 2, 3, 4, 5, 6];

        const result = findClosest(marksValues, currentValue);
        expect(result).toBe(1);
    });

    test('searches for the closest array element in the marks, initial value out of range ', () => {
        const currentValue = -2000;
        const marksValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

        const result = findClosest(marksValues, currentValue);
        expect(result).toBe(0);
    });

    test('searches for the closest array element in the marks, maximum value out of range ', () => {
        const currentValue = 2000;
        const marksValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

        const result = findClosest(marksValues, currentValue);
        expect(result).toBe(5);
    });
});

describe('setValueIndex', () => {
    test('should change the first position of the array', () => {
        const data = {
            values: [2, 8],
            source: [2, 8],
            newValue: 0,
            index: 0,
        };
        const result = setValueIndex(data);
        expect(result).toStrictEqual([0, 8]);
    });

    test('should change the secont position of the array', () => {
        const data = {
            values: [2, 8],
            source: [2, 8],
            newValue: 20,
            index: 1,
        };
        const result = setValueIndex(data);
        expect(result).toStrictEqual([2, 20]);
    });
});
