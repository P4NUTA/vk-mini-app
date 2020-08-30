import React from 'react';
import {List, PanelSpinner, SimpleCell} from '@vkontakte/vkui';
import {Platforms} from "../objects/Static";
import {getRandomKey, Icon} from "../objects/Utils";
import Fade from "@material-ui/core/Fade";


class Categories extends React.Component {
    render() {
        return <Fade in={true} timeout={600}>
            {
                this.props.categories.length ? <List>
                    {this.props.categories.map(category =>
                        <SimpleCell key={getRandomKey()} after={
                            Platforms[category.title] ? <Icon color="#555e6b" size={28} padding={4}>
                                {Platforms[category.title]}</Icon> : null}
                                    expandable onClick={() => this.props.openCategory(category)}>
                            {category.title}
                        </SimpleCell>)
                    }
                </List> : <PanelSpinner className="PanelSpinner" size="large"/>
            }
        </Fade>
    }
}

Categories.propTypes = {};

export default Categories;
