import {
    View,
    Panel,
    PanelHeader,
    Epic,
    Tabbar,
    TabbarItem,
} from "@vkontakte/vkui";

import React from 'react';

import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import Icon28CubeBoxOutline from '@vkontakte/icons/dist/28/cube_box_outline';
import Home from "./Home";
import Main from "./Main";
import Categories from "./Categories";

class Epictab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStory: 'profile'
        };
        this.onStoryChange = this.onStoryChange.bind(this);

    }

    onStoryChange(e) {
        this.setState({activeStory: e.currentTarget.dataset.story})
    }

    render() {

        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'home'}
                        data-story="home"
                        href="home"
                        text="Дом"
                    ><Icon28HomeOutline/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'main'}
                        data-story="main"
                        href="main"
                        text="Главная"
                    ><Icon28ArticleOutline/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'categories'}
                        data-story="categories"
                        href={'categories'}
                        text="Категории"
                    ><Icon28CubeBoxOutline/></TabbarItem>
                </Tabbar>
            }>
            </Epic>
        )
    }
}

export default Epictab;
