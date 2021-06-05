import React from 'react';

import { valueToPercent } from './rangeUtils';

const RangePointers = React.memo(
    ({ pointer, index, min, max, handleMouseDown }) => {
        const trackOffsetValue = valueToPercent(pointer, min, max);

        return (
            <span
                className="range__pointer"
                onMouseDown={(e) => handleMouseDown(e, index)}
                style={{ left: trackOffsetValue + '%' }}
            >
                <span className="range__pointer__value">
                    <span className="range__pointer__value__content">
                        <span className="range__pointer__value__content__text">
                            {pointer}
                        </span>
                    </span>
                </span>
            </span>
        );
    }
);

export default RangePointers;
