import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <Panel id={this.props.id}>
            <PanelHeader>Title</PanelHeader>
            {this.props.user &&
            <Group title="User Data Fetched with VK Bridge">
                <Cell
                    before={this.props.user.photo_200 ? <Avatar src={this.props.user.photo_200}/> : null}
                    description={this.props.user.city && this.props.user.city.title ? this.props.user.city.title : ''}
                >
                    {`${this.props.user.first_name} ${this.props.user.last_name}`}
                </Cell>
            </Group>}

            <Group title="Navigation Example">
                <Div>
                    <Button size="xl" level="2" onClick={this.props.go} data-to="main">
                        Main page
                    </Button>
                </Div>
                <Div>
                    <Button mode="outline" size="xl" level="2" onClick={this.props.go} data-to="categories">
                        Categories page
                    </Button>
                </Div>
            </Group>
        </Panel>
    }
}


Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    user: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
