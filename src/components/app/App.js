import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Form from '../LoginForm/LoginForm';
import Dashboard from '../Dashboard/Dashboard'
const App = () => {

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Form} />
                <Route path="/dashboard" exact component={Dashboard} />
            </Switch>
        </Router>
    )
}

export default App;