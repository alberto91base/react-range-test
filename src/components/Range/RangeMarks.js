import React from 'react';
import { valueToPercent } from './rangeUtils';
import classNames from 'classnames';

const RangeMarks = React.memo(({ mark, min, max, trackOffset }) => {
    let markOffset = valueToPercent(mark.value, min, max);
    const classRangeMark = classNames({
        range__mark: true,
        'range__mark--active': trackOffset <= markOffset,
    });
    const classRangeMarkLabel = classNames({
        range__mark__label: true,
        'range__mark__label--active': trackOffset <= markOffset,
    });

    return (
        <>
            <span
                className={classRangeMark}
                style={{ left: `${markOffset}%` }}
            ></span>
            <span
                className={classRangeMarkLabel}
                style={{ left: `${markOffset}%` }}
            >
                {mark.label}
            </span>
        </>
    );
});

export default RangeMarks;
