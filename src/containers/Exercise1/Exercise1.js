import React, { useState, useEffect } from 'react';

import { Range } from 'components';

import ApiService from 'services/api.service';

const Exercise1 = () => {
    const [rangeMinAndMaxValues, setRangeMinAndMaxValues] = useState(null);

    useEffect(() => {
        ApiService('range-exercise1')
            .then((response) => {
                setRangeMinAndMaxValues(response.data.range);
            })
            .catch((error) => {
                //error query
                console.log(error);
            });
    }, []);

    return (
        <div>
            {rangeMinAndMaxValues && (
                <Range step={1} min={rangeMinAndMaxValues?.min} max={rangeMinAndMaxValues?.max} value={[10, 90]} permitEditValues />
            )}
        </div>
    );
};

export default Exercise1;
