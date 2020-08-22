import React from 'react';
import PropTypes from 'prop-types';
import {Cell, List, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';

import '../styles/Main.css';
import {Thematics} from "../objects/Static";


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
                Thematics.length > 0 &&
                <List>
                    {Thematics.map(thematic => <Cell key={thematic.id}>{thematic.name}</Cell>)}
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
