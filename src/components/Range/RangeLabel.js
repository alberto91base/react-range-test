import React, { useState, useRef } from 'react';
import classNames from 'classnames';

const RangeLabel = React.memo(({ marks, values, onChangeValues, permitEditValues }) => {
    const inputValueMinRef = useRef();
    const inputValueMaxRef = useRef();
    const [inputValueMinEnable, setInputValueMinEnable] = useState(false);
    const [inputValueMaxEnable, setInputValueMaxEnable] = useState(false);
    const [valueInputMin, setValueInputMin] = useState(false);
    const [valueInputMax, setValueInputMax] = useState(false);

    const handleClickValue = (
        event,
        setInputValueEnable,
        setValueInput,
        inputValueRef,
        value,
    ) => {
        setInputValueEnable(true);
        setValueInput(value);
        permitEditValues && setTimeout(() => {
            inputValueRef.current.focus();
        }, [0]);
    };

    const handleValueOnChangeMin = (event, setValueInput) => {
        Number.isInteger(Number(event.target.value)) &&
            setValueInput(Number(event.target.value));
    };

    const handleValueInputOnblurMin = (event) => {
        changeValuesRange(
            [event.target.value, values[1]],
            setInputValueMinEnable
        );
    };

    const handleValueInputOnblurMax = (event) => {
        changeValuesRange(
            [values[0], event.target.value],
            setInputValueMaxEnable
        );
    };

    const changeValuesRange = (values, setInputValueEnable) => {
        onChangeValues(values);
        setInputValueEnable(false);
    };

    const classRangeLabel = classNames({
        range__label: true,
        'range__label--marks': marks,
    });

    return (
        <div className={classRangeLabel}>
            <button
                className="range__label__btn"
                onClick={(e) =>
                    handleClickValue(
                        e,
                        setInputValueMinEnable,
                        setValueInputMin,
                        inputValueMinRef,
                        values[0]
                    )
                }
            >
                {values[0]}
            </button>
            {permitEditValues && inputValueMinEnable && (
                <input
                    className="range__label__input"
                    type="text"
                    value={valueInputMin}
                    ref={inputValueMinRef}
                    onChange={(e) =>
                        handleValueOnChangeMin(e, setValueInputMin)
                    }
                    onBlur={handleValueInputOnblurMin}
                />
            )}

            <button
                className="range__label__btn"
                onClick={(e) =>
                    handleClickValue(
                        e,
                        setInputValueMaxEnable,
                        setValueInputMax,
                        inputValueMaxRef,
                        values[1]
                    )
                }
            >
                {values[values.length - 1]}
            </button>
            {permitEditValues && inputValueMaxEnable && (
                <input
                    className="range__label__input range__label__input--max"
                    type="text"
                    value={valueInputMax}
                    ref={inputValueMaxRef}
                    onChange={(e) =>
                        handleValueOnChangeMin(e, setValueInputMax)
                    }
                    onBlur={handleValueInputOnblurMax}
                />
            )}
        </div>
    );
});

export default RangeLabel;
