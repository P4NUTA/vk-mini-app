import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Button,
    Div,
    FixedLayout,
    Gallery,
    Link,
    MiniInfoCell,
    Placeholder,
    Separator,
    Snackbar
} from "@vkontakte/vkui";

import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24CameraOutline from '@vkontakte/icons/dist/24/camera_outline';
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';
import Icon20ArticleOutline from '@vkontakte/icons/dist/20/article_outline';
import Icon20FollowersOutline from '@vkontakte/icons/dist/20/followers_outline';
import Icon20GlobeOutline from '@vkontakte/icons/dist/20/globe_outline';
import Icon20PlaceOutline from '@vkontakte/icons/dist/20/place_outline';
import Icon16Done from '@vkontakte/icons/dist/16/done';

import '../styles/Game.css';


class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            snackbar: null,
            bought: false,

            shortGallerySlideIndex: 0,
            shortGallerySlideLength: 5,
        }

        this.openBase = this.openBase.bind(this);
        this.shortGalleryArrowButton = this.shortGalleryArrowButton.bind(this);
    }

    openBase() {
        if (this.state.snackbar) return;
        this.setState({
            snackbar: <Snackbar
                layout="vertical"
                onClose={() => this.setState({snackbar: null})}
                before={<Avatar size={24} style={{backgroundColor: 'var(--button_commerce_background)'}}><
                    Icon16Done fill="#fff" width={14} height={14}/>
                </Avatar>}
            >
                Успешно куплено
            </Snackbar>,
            bought: true,
        });
    }

    shortGalleryArrowButton(number) {
        const currentIndex = this.state.shortGallerySlideIndex;
        const currentLength = this.state.shortGallerySlideLength;
        let index;

        if (currentIndex === currentLength - 1 && number >= 0) {
            index = 0;
        } else if (currentIndex === 0 && number <= 0) {
            index = currentLength - 1;
        } else {
            index = currentIndex + number
        }

        this.setState({shortGallerySlideIndex: index})
    }

    render() {
        const game = this.props.data;

        return <div>
            <Gallery className="GameLogoContainer">
                <div className="GameLogo" style={{background: `url(${game.image})`}}/>
            </Gallery>
            <MiniInfoCell className="GameInfoRow" before={<Icon20ArticleOutline/>}
                          multiline>{game.description}</MiniInfoCell>
            <Separator className="GameInfoRow"/>

            <MiniInfoCell className="GameInfoRow" before={<Icon20FollowersOutline/>}>
                {`${game.buyersLabel} покупателей · ${game.playersLabel} игроков`}
            </MiniInfoCell>

            <MiniInfoCell before={<Icon20GlobeOutline/>}>
                <Link href={game.url}>{game.url}</Link>
            </MiniInfoCell>

            <MiniInfoCell
                before={<Icon20PlaceOutline/>}
                after={<Avatar size={24} src="https://image.flaticon.com/icons/svg/3061/3061341.svg"/>}
            >Германия, Франкфурт</MiniInfoCell>

            <MiniInfoCell
                className="GameScreenshotsInfoCell GameInfoRow"
                before={<Icon24CameraOutline height={20} width={20}/>}
                after={<Button mode="tertiary"><p>Все скриншоты</p> <Icon24Chevron height={20} width={20}/></Button>}
                mode="more"
                onClick={this.props.go}
                data-to="screenshots"
            >Скриншоты</MiniInfoCell>

            <Gallery className="GameShortScreenshotsGallery GameInfoRow" bullets="light"
                     slideWidth="100%"
                     align="center"
                     slideIndex={this.state.shortGallerySlideIndex}
                     onChange={slideIndex => this.setState({shortGallerySlideIndex: slideIndex})}>
                <div style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/576bdd5f-0595-4a06-b6d2-fe3084bbd52c.jpg)'}}/>
                <div style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/ef1c7301-f528-44f8-842e-0ead1d87df34.jpg)'}}/>
                <div style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/fd70b6ec-5249-4d10-bb95-0a1246d947a7.jpg)'}}/>
                <div style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/f7406cca-1b1f-4049-bce9-74cd5fd9de5c.jpg)'}}/>
                <div className="GameShortGalleryLast" style={{backgroundImage: 'url(https://u.kanobu.ru/screenshots/56/28e830a7-f5cc-42c3-83aa-24b28b8a4556.jpg)'}}>
                    <Placeholder header="Лучшие подборки" action={
                        <Button className="GameShortGalleryShowAllEntry" size="s" mode="outline" onClick={this.props.go} data-to="screenshots">Смотреть все</Button>
                    }>
                        Мы постоянно обновляем и улучшаем наши подборки скриншотов
                    </Placeholder>
                </div>
            </Gallery>

            <Div className="GameShortScreenshotsArrows">
                <Button size="s" mode="secondary" stretched onClick={
                    () => this.shortGalleryArrowButton(-1)
                }><Icon24BrowserBack height={20} width={20}/></Button>
                <Button size="s" mode="secondary" stretched onClick={
                    () => this.shortGalleryArrowButton(1)
                }><Icon24BrowserForward height={20} width={20}/></Button>
            </Div>

            <FixedLayout className="GameBuyBottomLayout" vertical="bottom">
                <Div>
                    <Button size="l" stretched onClick={this.openBase} disabled={this.state.bought}>
                        {this.state.bought ? 'Уже куплено' : `Купить за ${game.buttons[0].label}`}
                    </Button>
                </Div>
            </FixedLayout>

            {this.state.snackbar}
        </div>
    }
}

Game.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Game;
