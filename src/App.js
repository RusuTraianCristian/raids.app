import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import User from './User';
import NotFound from './NotFound';

const App = () => {

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path = "/" component = { Home }></Route>
                    <Route path = "/user" component = { User }></Route>
                    <Route component = { NotFound }></Route>
                </Switch>
            </Router>
        </Fragment>
    );
}

export default App;