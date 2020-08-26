import React from 'react';
import {Gallery, Button, Div} from "@vkontakte/vkui";
import { animateScroll } from 'react-scroll'

import Icon24Up from '@vkontakte/icons/dist/24/up';

import '../styles/Screenshots.css';


class Screenshots extends React.Component {
    render() {
        return <div>
            <Gallery className="ScreenshotsLogoContainer">
                <div className="ScreenshotsLogo" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/576bdd5f-0595-4a06-b6d2-fe3084bbd52c.jpg)'}}/>
                <div className="ScreenshotsLogo" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/ef1c7301-f528-44f8-842e-0ead1d87df34.jpg)'}}/>
                <div className="ScreenshotsLogo" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/fd70b6ec-5249-4d10-bb95-0a1246d947a7.jpg)'}}/>
                <div className="ScreenshotsLogo"  style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/f7406cca-1b1f-4049-bce9-74cd5fd9de5c.jpg)'}}/>
                <div className="ScreenshotsLogo" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/576bdd5f-0595-4a06-b6d2-fe3084bbd52c.jpg)'}}/>
                <div className="ScreenshotsLogo" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/ef1c7301-f528-44f8-842e-0ead1d87df34.jpg)'}}/>
                <div className="ScreenshotsLogo" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/fd70b6ec-5249-4d10-bb95-0a1246d947a7.jpg)'}}/>
                <div className="ScreenshotsLogo"  style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/f7406cca-1b1f-4049-bce9-74cd5fd9de5c.jpg)'}}/>
                <div className="ScreenshotsLogo" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/576bdd5f-0595-4a06-b6d2-fe3084bbd52c.jpg)'}}/>
                <div className="ScreenshotsLogo" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/ef1c7301-f528-44f8-842e-0ead1d87df34.jpg)'}}/>
                <div className="ScreenshotsLogo" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/fd70b6ec-5249-4d10-bb95-0a1246d947a7.jpg)'}}/>
                <div className="ScreenshotsLogo"  style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/f7406cca-1b1f-4049-bce9-74cd5fd9de5c.jpg)'}}/>
                <Div className="ScreenshotsReturn">
                    <Button size="l" stretched before={<Icon24Up width={16} height={16}/>} onClick={animateScroll.scrollToTop}>
                        Вернуться
                    </Button>
                </Div>
            </Gallery>
        </div>
    }
}

Screenshots.propTypes = {};

export default Screenshots;
