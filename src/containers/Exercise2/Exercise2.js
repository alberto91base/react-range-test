import React, { useState, useEffect } from 'react';

import { Range } from 'components';

import ApiService from 'services/api.service';

// const marks = [
//     {
//         value: 0,
//         label: '0°C',
//     },
//     {
//         value: 20,
//         label: '20°C',
//     },
//     {
//         value: 37,
//         label: '37°C',
//     },
//     {
//         value: 100,
//         label: '100°C',
//     },
// ];

const Exercise2 = () => {
    const [marks, setMarks] = useState(null);
    const [rangeMinAndMaxValues, setRangeMinAndMaxValues] = useState(null);

    useEffect(() => {
        ApiService('range-exercise2')
            .then((response) => {
                console.log(response);
                setMarks(response.data.marks);
            })
            .catch((error) => {
                //error query
                console.log(error);
            });
    }, []);

    return (
        <div>
            {marks && (
                <Range
                    step={null}
                    min={marks[0].value}
                    max={marks[marks.length - 1].value}
                    marks={marks}
                    value={[marks[0].value, marks[marks.length - 1].value]}
                />
            )}
        </div>
    );
};

export default Exercise2;
