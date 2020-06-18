import React, { Fragment } from 'react';
import './NotFound.css';

const NotFound = () => {

    const redirect = () => {
        window.location.href = "/";
    }

    return (
        <Fragment>
            <div id = "notfound">
                Page not found.
                <button onClick = { redirect }>home</button>
            </div>
        </Fragment>
    );
}

export default NotFound;