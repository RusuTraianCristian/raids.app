import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import User from './User';
import NotFound from './NotFound';
import jwt_decode from 'jwt-decode';

const App = () => {

    const [token, setToken] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(user);
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.replace('#', '?'));
        if (params.has('id_token')) {
            const idtoken = params.get('id_token');
            let decoded = jwt_decode(idtoken);
            let username = decoded.preferred_username;
            localStorage.setItem('token', idtoken);
            localStorage.setItem('authenticated', true);
            localStorage.setItem('user', username);
            setToken(idtoken);
            setAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (authenticated) {
            window.location.href = `/user:${user}`;
        }
    }, [authenticated]);

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path = "/" component = { Home }></Route>
                    { user && <Route exact path = { `/user:${ user }` } render = { props => <User /> }></Route> }
                    <Route component = { NotFound }></Route>
                </Switch>
            </Router>
        </Fragment>
    );
}

export default App;
