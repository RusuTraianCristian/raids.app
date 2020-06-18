import React, { Fragment, useEffect, useState } from 'react';
import "./User.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const User = () => {

    const clientId = 'ptm1pmj69bfuceli46nae7bfhi7q8n';

    const [channels, setChannels] = useState([]);
    const [user, setUser] = useState(null);

    const getExtensionLiveChannels = async () => {
        const url = `https://api.twitch.tv/extensions/${clientId}/live_activated_channels`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Client-Id': clientId
            }
        }
        try {
            const res = await fetch(url, options);
            const status = await res.status;
            const data = await res.json();
            if (status === 200) console.log(`Request processed successfully, server returned a ${status} code status.`);
            console.log("This is the data we got in response: ", data);
            setChannels([...data.channels]);
        } catch (err) {
            console.error(err);
        } finally {
            console.log("Request done.");
        }
    }

    const logout = () => {
        window.location.href = "/";
        localStorage.clear();
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        getExtensionLiveChannels();
        setUser(user);
    }, []);

    return (
        <Fragment>
            <div className = "profileHeader">
                <div className = "left">
                    { `Hi, ${ user }` }
                </div>
                <div className = "right">
                    <button className = "logout" onClick = { logout }>Log Out</button>
                </div>
            </div>
            <div className="channel">
                Live channels: { channels.length }
            </div>
            { channels.map(chan => (<div className = "channel" key = { chan.id }><p>{ chan.username }</p>{ `playing ${ chan.game } with ${ chan.view_count } viewers. Title is: ${ chan.title }` }<p><a href = { `https://twitch.tv/${ chan.username }` } target = "_blank" rel = "noopener noreferrer">view channel <FontAwesomeIcon className="icons" icon={ faExternalLinkAlt } /></a></p></div>)) }
        </Fragment>
    );
}

export default User;