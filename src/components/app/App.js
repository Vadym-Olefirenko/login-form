import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Form from '../LoginForm/LoginForm';
import Dashboard from '../Dashboard/Dashboard'
const App = () => {
    const [token, setToken] = useState();
    const settingOfToken = (value) => {
        setToken(value);
    }
    return (
       <Router>
            <Switch>
                <Route path="/" exact render={
                    () => (<Form tokenValue = {settingOfToken}/>)
                }/>
                <Route path="/dashboard" exact render={
                    () => (<Dashboard token={token}/>)
                }/>
            </Switch>
       </Router>
    )
}

export default App;