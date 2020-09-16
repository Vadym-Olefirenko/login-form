import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Form from '../LoginForm/LoginForm';
import Dashboard from '../Dashboard/Dashboard'
const App = () => {
    return (
       <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Form}/>
                <Route path="/dashboard" exact component={Dashboard}/>
            </Switch>
       </BrowserRouter>
    )
}

export default App;