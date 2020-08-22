import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardScroll, Group, Header, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';

import '../styles/Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <Panel id={this.props.id}>
            <PanelHeader left={<PanelHeaderBack onClick={this.props.go} data-to="home"/>}>
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
