import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, Div, FixedLayout, Gallery, Link, MiniInfoCell, Separator, Snackbar} from "@vkontakte/vkui";

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
        }

        this.openBase = this.openBase.bind(this);
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

            <FixedLayout vertical="bottom">
                <Separator wide/>
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
