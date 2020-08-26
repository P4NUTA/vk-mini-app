import React from 'react';
import PropTypes from 'prop-types';
import {Group, Header, Placeholder} from '@vkontakte/vkui';
import CardCarousel from "../objects/CardCarousel";
import Icon36GameOutline from '@vkontakte/icons/dist/36/game_outline';

import '../styles/Main.css';


class Main extends React.Component {
    render() {
        return <div>
            <Placeholder
                icon={<Icon36GameOutline className="GameParkPlayIcon" width={56} height={56}/>}
                header="Лучшая библиотека игр"
            >
                Играйте в игры, которые были проверены миллионами игроков
            </Placeholder>
            <Group separator="hide" header={<Header mode="secondary">Предзаказ</Header>}>
                <CardCarousel data={this.props.newGames}/>
            </Group>
            <Group separator="hide" header={<Header mode="secondary">Новинки</Header>}>
                <CardCarousel data={this.props.games}/>
            </Group>
            <Group separator="hide" header={<Header mode="secondary">Лидеры продаж</Header>}>
                <CardCarousel/>
            </Group>
            <Group separator="hide" header={<Header mode="secondary">Скоро в продаже</Header>}>
                <CardCarousel/>
            </Group>
            <Group separator="hide" header={<Header mode="secondary">Топ GameReplay</Header>}>
                <CardCarousel/>
            </Group>
        </div>
    }
}

Main.propTypes = {
    games: PropTypes.array.isRequired,
    newGames: PropTypes.array.isRequired,
};

export default Main;
