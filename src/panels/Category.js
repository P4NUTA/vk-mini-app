import {Avatar, Counter, List, PanelSpinner, SimpleCell} from "@vkontakte/vkui";
import {getRandomKey} from "../objects/Utils";
import Fade from "@material-ui/core/Fade";
import React from "react";


class Category extends React.Component {
    render() {
        return <Fade in={true} timeout={600}>
            {
                this.props.category.games.length ? <List>
                    {
                        this.props.category.games.map(game => <SimpleCell
                            key={getRandomKey()} className="CategoryCell" before={
                            <Avatar className="GameImageAvatar"
                                    style={{'--avatar-image': `url(${game.image})`}}/>
                        } indicator={<Counter size="m">{game.priceLabel}</Counter>}
                            description={game.description} onClick={() => this.props.openGame(game)}>
                            {game.name}
                        </SimpleCell>)
                    }
                </List> : <PanelSpinner size="large"/>
            }
        </Fade>
    }
}

Category.propTypes = {};

export default Category;


