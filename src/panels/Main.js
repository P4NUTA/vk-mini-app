import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardScroll, Group, IOS, platform} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Header from "@vkontakte/vkui/dist/components/Header/Header";

import Icon24Back from '@vkontakte/icons/dist/24/back';
import './Main.css';

const osName = platform();


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <Panel id={this.props.id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={this.props.go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Main
            </PanelHeader>
            <Group separator="hide" header={<Header mode="secondary">Новинки</Header>}>
                <CardScroll>
                    <Card size="s" title="Title">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                </CardScroll>
            </Group>
            <Group separator="hide" header={<Header mode="secondary">Лидеры продаж</Header>}>
                <CardScroll>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                </CardScroll>
            </Group>
            <Group separator="hide" header={<Header mode="secondary">Скоро в продаже</Header>}>
                <CardScroll>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                </CardScroll>
            </Group>
            <Group separator="hide" header={<Header mode="secondary">Топ GameReplay</Header>}>
                <CardScroll>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                    <Card size="s">
                        <div style={{width: 144, height: 96}}/>
                    </Card>
                </CardScroll>
            </Group>
        </Panel>
    }
}

Main.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Main;
