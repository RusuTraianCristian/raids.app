import React, { Fragment, useEffect, useState } from 'react';

const User = () => {

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const email = localStorage.getItem('email');
        setUser(user);
        setEmail(email);
    }, []);

    return (
        <Fragment>
            { `user is ${ user } and email is ${ email }` }
        </Fragment>
    );
}

export default User;