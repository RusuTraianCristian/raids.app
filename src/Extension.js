import React, { Fragment, useState, useEffect } from 'react';
import "./Extension.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Extension = () => {

    const clientId = 'ptm1pmj69bfuceli46nae7bfhi7q8n';

    const [channels, setChannels] = useState([]);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);

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
        window.location.href = '/';
        localStorage.clear();
    }

    const goHome = () => {
        window.location.href = '/';
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        const email = localStorage.getItem('email');
        getExtensionLiveChannels();
        setUser(user);
        setEmail(email);
    }, []);

    return (
        <Fragment>
            <div className = "profileHeader">
                <div className = "left" onClick = { goHome }>
                    raid<span>S</span>
                </div>
                <div className = "right">
                    <a href = "/user">profile </a>
                    <Link to = "/user">profile</Link>
                    <button className = "logout" onClick = { logout }>Log Out</button>
                </div>
            </div>
            <div className="channel sectiontype">
                Twitch live channels with <span>Raids</span> extension active: { channels.length }
            </div>
            { channels.map(chan => (<div className = "channel" key = { chan.id }><p>{ chan.username }</p>{ `playing ${ chan.game } with ${ chan.view_count } viewers. Title is: ${ chan.title }` }<p><a href = { `https://twitch.tv/${ chan.username }` } target = "_blank" rel = "noopener noreferrer">view channel <FontAwesomeIcon className="icons" icon={ faExternalLinkAlt } /></a></p></div>)) }
        </Fragment>
    );
}

export default Extension;