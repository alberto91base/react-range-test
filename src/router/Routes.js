import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Error404, Home, Exercise1, Exercise2 } from '../containers';

const Routes = () => (
    <Switch>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/exercise1'} component={Exercise1} />
        <Route exact path={'/exercise2'} component={Exercise2} />
        <Route path="*" component={Error404} />
    </Switch>
);

export default Routes;
