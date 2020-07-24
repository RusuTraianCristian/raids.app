import React, { Fragment, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import './Home.css';
import Login from './Login';
import Extension from './Extension';

const Home = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const authenticated = localStorage.getItem('authenticated');
        if (user && authenticated) {
            setUser(user);
            setAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.replace('#', '?'));
        if (params.has('id_token')) {
            const idtoken = params.get('id_token');
            let decoded = jwt_decode(idtoken);
            let username = decoded.preferred_username;
            let email = decoded.email;
            localStorage.setItem('token', idtoken);
            localStorage.setItem('user', username);
            localStorage.setItem('email', email);
            localStorage.setItem('authenticated', true);
            setAuthenticated(true);
            window.location.href = '/';
        }
    }, []);

    return (
        <Fragment>
            { user && authenticated ? <Extension /> : <Login /> }
        </Fragment>
    );
}

export default Home;