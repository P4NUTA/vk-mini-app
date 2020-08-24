import React from 'react';
import bridge from '@vkontakte/vk-bridge';

import {
    Button,
    Cell,
    Epic,
    Group,
    Header,
    Panel,
    PanelHeader,
    Switch,
    Tabbar,
    TabbarItem,
    View,
    ScreenSpinner,
    List,
    CardScroll,
    Card,
    Search,
    Alert,
    HorizontalScroll,
} from "@vkontakte/vkui";

import Icon28AllCategoriesOutline from '@vkontakte/icons/dist/28/all_categories_outline';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28More from '@vkontakte/icons/dist/28/more';

import '@vkontakte/vkui/dist/vkui.css';
import {Thematics, Games, NewGames} from "./objects/Static";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStory: 'main',
            activePanel: 'main',
            user: null,
            popout: <ScreenSpinner size='large'/>,
        };

        this.go = this.go.bind(this);
        this.setActivePanel = this.setActivePanel.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setPopout = this.setPopout.bind(this);
        this.onStoryChange = this.onStoryChange.bind(this);

        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
                this.setState({themeName: schemeAttribute.value});
            } else if (type === 'VKWebAppGetUserInfoResult') {
                this.setUser(data);
                this.setPopout(null);
            }
        });

        bridge.send('VKWebAppGetUserInfo');
    }

    setActivePanel(panel) {
        this.setState({activePanel: panel})
    }

    setUser(user) {
        this.setState({user: user})
    }

    setPopout(popout) {
        this.setState({popout: popout})
    }

    go(e) {
        this.setActivePanel(e.currentTarget.dataset.to);
    }

    onStoryChange(e) {
        this.setState({activeStory: e.currentTarget.dataset.story})
    }

    render() {
        return <Epic activeStory={this.state.activeStory} tabbar={
            <Tabbar>
                <TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'main'}
                    data-story="main"
                    text="Главная">
                    <Icon28Newsfeed/>
                </TabbarItem>
                <TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'categories'}
                    data-story="categories"
                    text="Категории">
                    <Icon28AllCategoriesOutline/>
                </TabbarItem>
                <TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'search'}
                    data-story="search"
                    text="Поиск">
                    <Icon28Search/>
                </TabbarItem>
                <TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'settings'}
                    data-story="settings"
                    text="Настройки">
                    <Icon28More/>
                </TabbarItem>
            </Tabbar>
        }>
            <View id="main" activePanel={this.state.activePanel}>
                <Panel id="main">
                    <PanelHeader>GamePark</PanelHeader>
                    <Group separator="hide" header={<Header mode="secondary">Предзаказ</Header>}>
                        {NewGames.length &&
                        <HorizontalScroll>
                            <div style={{display: 'flex'}}>
                                {NewGames.map(newgames =>
                                    <div key={newgames.id}
                                         style={{width: 144, height: 130, textAlign: 'center', marginLeft: 5}}>
                                        <img src={newgames.image}
                                             style={{width: 135, height: 96}}/>
                                        <Button>{newgames.price}</Button>
                                    </div>)}
                            </div>
                        </HorizontalScroll>}
                    </Group>
                    <Group separator="hide" header={<Header mode="secondary">Новинки</Header>}>
                        {Games.length &&
                        <HorizontalScroll>
                            <div style={{display: 'flex'}}>
                                {Games.map(games =>
                                    <div key={games.id}
                                         style={{width: 144, height: 130, textAlign: 'center', marginLeft: 5}}>
                                        <img src={games.image}
                                             style={{width: 135, height: 96}}/>
                                        <Button>{games.price}</Button>
                                    </div>)}
                            </div>
                        </HorizontalScroll>}
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
            </View>
            <View id="categories" activePanel="categories">
                <Panel id="categories">
                    <PanelHeader>Категории</PanelHeader>
                    {Thematics.length > 0 &&
                    <List>
                        {Thematics.map(thematic => <Cell key={thematic.id} expandable>{thematic.name}</Cell>)}
                    </List>}
                </Panel>
            </View>
            <View id="search" activePanel="search">
                <Panel id="search">
                    <PanelHeader>Поиск</PanelHeader>
                    <Search value={''}/>
                </Panel>
            </View>
            <View id="settings" activePanel="settings">
                <Panel id="settings">
                    <PanelHeader>Настройки</PanelHeader>
                    <Group header={<Header mode="secondary">Настройки приложения</Header>}>
                        <Cell asideContent={<Switch/>}>
                            Комментарии к записям
                        </Cell>
                        <Cell asideContent={<Switch defaultChecked/>}>
                            Ссылки
                        </Cell>
                        <Cell asideContent={<Switch disabled/>}>
                            Фотоальбомы
                        </Cell>
                    </Group>
                </Panel>
            </View>
        </Epic>
    }
}

export default App;
