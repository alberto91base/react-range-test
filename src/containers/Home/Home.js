import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/exercise1">exercise1</Link>
                </li>
                <li>
                    <Link to="/exercise2">exercise2</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
