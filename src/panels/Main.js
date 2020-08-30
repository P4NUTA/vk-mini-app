import React from 'react';
import PropTypes from 'prop-types';
import {Group, Header, Placeholder} from '@vkontakte/vkui';
import {getRandomKey} from "../system/Utils";
import CardCarousel from "../objects/CardCarousel";
import Icon36GameOutline from '@vkontakte/icons/dist/36/game_outline';

import '../styles/Main.css';


class Main extends React.Component {
    render() {
        const tabNames = [
            'Предзаказ', 'Новинки', 'Лидеры продаж',
            'Скоро в продаже', 'Топ GameReplay'
        ]

        return <div className="MainContainer">
            <Placeholder
                icon={<Icon36GameOutline className="GameParkPlayIcon" width={56} height={56}/>}
                header="Лучшая библиотека игр"
            >
                Играйте в игры, которые были проверены миллионами игроков
            </Placeholder>
            {
                this.props.tabs.length ? this.props.tabs.map(tab => <Group key={getRandomKey()}
                                                                           separator="hide" header={<Header
                    mode="secondary">{tab.title}</Header>}>
                    <CardCarousel data={tab.games} isProductInBasket={this.props.isProductInBasket}/>
                </Group>) : tabNames.map(tab => <Group key={getRandomKey()}
                                                       separator="hide"
                                                       header={<Header mode="secondary">{tab}</Header>}>
                    <CardCarousel/>
                </Group>)
            }
        </div>
    }
}

Main.propTypes = {
    games: PropTypes.array.isRequired,
    newGames: PropTypes.array.isRequired,
};

export default Main;
