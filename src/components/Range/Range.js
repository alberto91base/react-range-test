import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import RangeLabel from './RangeLabel';
import RangeMarks from './RangeMarks';
import RangePointers from './RangePointers';

import {
    trackFinger,
    valueToPercent,
    percentToValue,
    roundValueToStep,
    clamp,
    findClosest,
    setValueIndex,
} from './rangeUtils';

function asc(a, b) {
    return a - b;
}

const Range = ({
    className,
    onChange,
    onMouseDown,
    step = 1,
    value,
    min = 0,
    max = 100,
    marks,
    permitEditValues,
}) => {
    const sliderRef = useRef();
    const [values, setValues] = useState(value);
    const indexSelected = useRef();

    useEffect(() => {
        const valuesInMargin = values.map((itemValue) => {
            return clamp(itemValue, min, max);
        });
        setValues(valuesInMargin);

        return () => {
            document.getElementsByTagName('html')[0].style.cursor = 'auto';
            document.removeEventListener('mousemove', handleTouchMove);
            document.removeEventListener('mouseup', handleTouchEnd);
        };
    }, []);

    useEffect(() => {
        const valuesInMargin = values.map((itemValue) => {
            return clamp(itemValue, min, max);
        });
        setValues(valuesInMargin);
    }, [min, max]);

    const handleChangeValues = (values) => {
        setValues(values);
    };

    const handleTouchMove = (event) => {
        const finger = trackFinger(event);

        if (!finger) {
            return;
        }

        document.getElementsByTagName('html')[0].style.cursor = 'grab';

        const _getFingerNewValue = getFingerNewValue({
            finger: finger,
            move: true,
            values: values,
            source: values,
        });
        const { newValue, activeIndex } = _getFingerNewValue;

        setValues(newValue);

        if (onChange) {
            onChange(event, newValue);
        }
    };

    const handleMouseDown = (event, index) => {
        event.preventDefault();
        indexSelected.current = index;
        if (onMouseDown) {
            onMouseDown(event);
        }

        if (onChange) {
            onChange(event, newValue);
        }

        document.addEventListener('mousemove', handleTouchMove);
        document.addEventListener('mouseup', handleTouchEnd);
    };

    const handleTouchEnd = (event) => {
        document.getElementsByTagName('html')[0].style.cursor = 'auto';
        document.removeEventListener('mousemove', handleTouchMove);
        document.removeEventListener('mouseup', handleTouchEnd);
    };

    const getFingerNewValue = ({ finger, values, source }) => {
        const slider = sliderRef.current;

        const _slider$getBoundingCl = slider.getBoundingClientRect(),
            width = _slider$getBoundingCl.width,
            left = _slider$getBoundingCl.left;

        let percent;
        percent = (finger.x - left) / width;

        let newValue;
        newValue = percentToValue(percent, min, max);

        if (step) {
            newValue = roundValueToStep(newValue, step, min);
        } else {
            const marksValues = marks.map(function (mark) {
                return mark.value;
            });
            const closestIndex = findClosest(marksValues, newValue);
            newValue = marksValues[closestIndex];
        }

        newValue = clamp(newValue, min, max);
        let activeIndex = indexSelected.current;

        const previousValue = newValue;
        newValue = setValueIndex({
            values: values,
            source: source,
            newValue: newValue,
            index: activeIndex,
        }).sort(asc);
        activeIndex = newValue.indexOf(previousValue);

        return {
            newValue: newValue,
            activeIndex: activeIndex,
        };
    };

    const trackOffset = valueToPercent(values[0], min, max);
    const trackLeap =
        valueToPercent(values[values.length - 1], min, max) - trackOffset;

    const htmlMarks =
        marks &&
        marks.map((mark, index) => {
            return (
                <RangeMarks
                    key={index}
                    mark={mark}
                    min={min}
                    max={max}
                    trackOffset={trackOffset}
                />
            );
        });

    const htmlPointers =
        values &&
        values.map((item, index) => {
            return (
                <RangePointers
                    key={index}
                    pointer={item}
                    index={index}
                    min={min}
                    max={max}
                    handleMouseDown={handleMouseDown}
                />
            );
        });

    return (
        <div className={className}>
            <h1>Range</h1>
            <div className="range" ref={sliderRef}>
                <span className="range__rail"></span>
                <span
                    className="range__track"
                    style={{ left: trackOffset + '%', width: trackLeap + '%' }}
                ></span>
                {htmlMarks}
                {htmlPointers}
                <RangeLabel
                    values={values}
                    marks={marks}
                    onChangeValues={handleChangeValues}
                    permitEditValues={permitEditValues}
                />
            </div>
        </div>
    );
};

Range.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.number
    ).isRequired,
    step: PropTypes.number,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    onMouseDown: PropTypes.func,
    marks: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number,
        })
    ),
    permitEditValues: PropTypes.bool,
};

export default Range;
