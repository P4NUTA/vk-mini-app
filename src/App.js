import React from 'react';
import bridge from '@vkontakte/vk-bridge';

import {
    Avatar,
    Cell,
    Epic,
    Group,
    Header,
    List,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelSpinner,
    ScreenSpinner,
    Search,
    Separator,
    SimpleCell,
    Switch,
    Tabbar,
    TabbarItem,
    View
} from "@vkontakte/vkui";

import '@vkontakte/vkui/dist/vkui.css';
import './styles/App.css';

import Icon28AllCategoriesOutline from '@vkontakte/icons/dist/28/all_categories_outline';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28More from '@vkontakte/icons/dist/28/more';

import {Games, NewGames, Thematics} from "./objects/Static";
import {convertPrices, getRandomKey} from "./objects/Utils";
import Main from "./panels/Main";
import Game from "./panels/Game";
import Screenshots from "./panels/Screenshots";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            darkTheme: false,
            themeName: 'client_light',

            activeStory: 'main',
            activePanel: 'main',
            lastPanels: [],

            user: null,
            popout: <ScreenSpinner size='large'/>,

            thematic: '',
            currentGame: {},

            games: [],
            newGames: [],
            thematics: [],
        };

        this.go = this.go.bind(this);
        this.back = this.back.bind(this);
        this.setUser = this.setUser.bind(this);
        this.openGame = this.openGame.bind(this);
        this.setPopout = this.setPopout.bind(this);
        this.onStoryChange = this.onStoryChange.bind(this);
        this.setActivePanel = this.setActivePanel.bind(this);
        this.loadDataFromServer = this.loadDataFromServer.bind(this);

        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const themeName = data.scheme ? data.scheme : 'client_light';
                this.setTheme(themeName);

            } else if (type === 'VKWebAppGetUserInfoResult') {
                this.setUser(data);
                this.setPopout(null);
            }
        });

        bridge.send('VKWebAppGetUserInfo');
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    setTheme(themeName) {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = themeName;
        document.body.attributes.setNamedItem(schemeAttribute);
        this.setState({
            themeName: themeName,
            darkTheme: themeName !== 'client_light' && themeName !== 'bright_light',
        });
    }

    loadDataFromServer() {
        setTimeout(() => this.setState({
            games: convertPrices(Games, this.openGame),
            newGames: convertPrices(NewGames, this.openGame),
            thematics: Thematics,
        }), 2000)
    }

    setActivePanel(panel) {
        this.setState({
            lastPanels: this.state.lastPanels.concat([this.state.activePanel]),
            activePanel: panel
        })
    }

    setUser(user) {
        this.setState({user: user})
    }

    setPopout(popout) {
        this.setState({popout: popout})
    }

    onStoryChange(e) {
        const storyName = e.currentTarget.dataset.story;
        this.setState({
            activeStory: storyName,
            activePanel: storyName,
            lastPanels: []
        })
    }

    openGame(data) {
        this.setState({
            currentGame: data, activePanel: 'game',
            lastPanels: this.state.lastPanels.concat([this.state.activePanel])
        })
    }

    go(e) {
        this.setActivePanel(e.currentTarget.dataset.to);
    }

    back() {
        this.setState({
            activePanel: this.state.lastPanels[this.state.lastPanels.length - 1],
            lastPanels: this.state.lastPanels.slice(0, this.state.lastPanels.length - 1)
        });
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
                    <Main games={this.state.games} newGames={this.state.newGames}/>
                </Panel>
                <Panel id="game">
                    <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>
                        {this.state.currentGame.name}
                    </PanelHeader>
                    <Game data={this.state.currentGame} go={this.go} back={this.back}/>

                </Panel>
                <Panel id="screenshots">
                    <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>Скриншоты</PanelHeader>
                    <Screenshots />
                </Panel>
            </View>
            <View id="categories" activePanel={this.state.activePanel}>
                <Panel id="categories">
                    <PanelHeader>Категории игр</PanelHeader>
                    {
                        this.state.thematics.length ? <List>
                            {this.state.thematics.map(thematic =>
                                <SimpleCell key={thematic.id} expandable onClick={() => this.setState({
                                    thematic: thematic, activePanel: 'category',
                                    lastPanels: this.state.lastPanels.concat(['categories'])
                                })}>
                                    {thematic.name}
                                </SimpleCell>)
                            }
                        </List> : <PanelSpinner className="PanelSpinner" size="large"/>
                    }
                </Panel>
                <Panel id="category">
                    <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>
                        {this.state.thematic.name}
                    </PanelHeader>
                    {
                        this.state.games.length ? <List>
                            {
                                this.state.games.map(game => <SimpleCell
                                    key={getRandomKey()} before={
                                    <Avatar className="GameImageAvatar"
                                            style={{'--avatar-image': `url(${game.image})`}}/>
                                } description={game.description} onClick={() => this.openGame(game)}>
                                    {game.name}
                                </SimpleCell>)
                            }
                        </List> : <PanelSpinner size="large"/>
                    }
                </Panel>
                <Panel id="game">
                    <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>
                        {this.state.currentGame.name}
                    </PanelHeader>
                    <Game data={this.state.currentGame} go={this.go} back={this.back}/>
                </Panel>
                <Panel id="screenshots">
                    <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>Скриншоты</PanelHeader>
                    <Screenshots />
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
                        <Separator/>
                        <Cell asideContent={
                            <Switch defaultChecked={this.state.darkTheme}
                                    value={this.state.darkTheme}
                                    onClick={() => this.setTheme(
                                        this.state.darkTheme ? 'bright_light' : 'space_gray'
                                    )}/>
                        }>Темная тема</Cell>
                    </Group>
                </Panel>
            </View>
        </Epic>
    }
}

export default App;
