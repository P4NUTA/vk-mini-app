import React from 'react';
import PropTypes from 'prop-types';
import {Group, Header} from '@vkontakte/vkui';
import CardCarousel from "../objects/CardCarousel";

import '../styles/Main.css';


class Main extends React.Component {
    render() {
        return <div>
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
