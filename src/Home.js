import React, { Fragment } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';

const Home = () => {

    const clientId = 'ptm1pmj69bfuceli46nae7bfhi7q8n';

    const twitchInstall = () => {
        window.open('https://www.twitch.tv/ext/ptm1pmj69bfuceli46nae7bfhi7q8n-1.0.0', '_blank');
    }
    const twitchAuth = () => {
        const url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000&response_type=token+id_token&scope=openid user:read:email bits:read viewing_activity_read`;
        window.location.href = url;
    }

    return (
        <Fragment>
            <div id="container">
                <div className="logo">
                    raid<span>S</span>
                </div>
                <button className="button install" onClick = { () => twitchInstall() }>
                    Install on Twitch <FontAwesomeIcon className="icons" icon={ faExternalLinkAlt } />
                </button>
                <button className="button login" onClick = { () => twitchAuth() }>
                    Twitch Login <FontAwesomeIcon className="icons" icon={ faTwitch } />
                </button>
            </div>
        </Fragment>
    );
}

export default Home;