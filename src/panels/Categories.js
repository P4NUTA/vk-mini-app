import React from 'react';
import PropTypes from 'prop-types';
import {Cell, List, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';

import '../styles/Main.css';

const thematics = [
    {id: 1, name: "PS4"},
    {id: 2, name: "PS3"},
    {id: 3, name: "Xbox One"},
    {id: 4, name: "Switch"},
    {id: 5, name: "3DS"},
    {id: 6, name: "PC"},
    {id: 7, name: "Настолки"},
    {id: 8, name: "Сувениры"},
    {id: 9, name: "Комиксы"},
    {id: 10, name: "Другое"},
];

class Categories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <Panel id={this.props.id}>
            <PanelHeader left={<PanelHeaderBack onClick={this.props.go} data-to="home"/>}>
                Categories
            </PanelHeader>
            {
                thematics.length > 0 &&
                <List>
                    {thematics.map(thematic => <Cell key={thematic.id}>{thematic.name}</Cell>)}
                </List>
            }
        </Panel>
    }
}

Categories.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Categories;
