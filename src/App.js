import React from 'react';
import bridge from '@vkontakte/vk-bridge';

import {Epic, Panel, PanelHeader, PanelHeaderBack, ScreenSpinner, Tabbar, TabbarItem, View} from "@vkontakte/vkui";

import '@vkontakte/vkui/dist/vkui.css';
import './styles/App.css';
import Icon28AllCategoriesOutline from '@vkontakte/icons/dist/28/all_categories_outline';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';

import {CategoriesData, Games, NewGames, TabsData, Thematics} from "./objects/Static";
import {convertPrices, formatGame, SystemStorage} from "./objects/Utils";
import Main from "./panels/Main";
import Game from "./panels/Game";
import Screenshots from "./panels/Screenshots";
import ServiceLoader from "./objects/ServiceLoader";
import Fade from "@material-ui/core/Fade";
import Categories from "./panels/Categories";
import Category from "./panels/Category";
import Profile from "./panels/Profile";
import History from "./panels/History";
import Settings from "./panels/Settings";
import Search from "./panels/Search";

class App extends React.Component {
    constructor(props) {
        super(props);

        const products = SystemStorage.local.get('UserProducts');
        const history = SystemStorage.local.get('UserHistory')

        this.state = {
            darkTheme: false,
            themeName: 'client_light',

            activeStory: 'main',
            activePanel: 'main',
            lastPanels: [],

            user: null,
            popout: <ScreenSpinner size='large'/>,

            category: {games: []},
            currentGame: {},

            games: [],
            newGames: [],
            tabs: [],
            categories: [],

            products: products ? products : [],
            history: history ? history : [],

            loading: true
        };

        this.go = this.go.bind(this);
        this.back = this.back.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.openGame = this.openGame.bind(this);
        this.setPopout = this.setPopout.bind(this);
        this.openCategory = this.openCategory.bind(this);
        this.onStoryChange = this.onStoryChange.bind(this);
        this.switchProduct = this.switchProduct.bind(this);
        this.setActivePanel = this.setActivePanel.bind(this);
        this.isProductInBasket = this.isProductInBasket.bind(this);
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

    isProductInBasket(productId) {
        return this.state.products.map(element => element.id).indexOf(productId) >= 0
    }

    switchProduct(product) {
        let products;
        if (this.isProductInBasket(product.id)) {
            const index = this.state.products.map(element => element.id).indexOf(product.id);
            products = this.state.products.slice(0, index)
                .concat(this.state.products.slice(index + 1));
        } else {
            products = this.state.products.concat([product])
        }

        SystemStorage.local.set('UserProducts', products)
        this.setState({products: products});
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
            loading: false,
        }, () => setTimeout(() => this.setState({
            games: convertPrices(Games, this.openGame),
            newGames: convertPrices(NewGames, this.openGame),
            thematics: Thematics,
            tabs: TabsData.map(tab => {
                tab.games = convertPrices(tab.games.map(game => formatGame(game)), this.openGame)
                return tab;
            }),
            categories: CategoriesData.map(category => {
                category.games = convertPrices(category.games.map(game => formatGame(game)), this.openGame)
                return category;
            })
        }), 0)), 0)
    }

    setActivePanel(panel, story) {
        this.setState({
            lastPanels: this.state.lastPanels.concat([this.state.activePanel]),
            activePanel: panel,
            activeStory: story ? story : this.state.activeStory
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

    openGame(data, hideInHistory) {
        const history = this.state.history.concat(hideInHistory ? [] : [data]);
        SystemStorage.local.set('UserHistory', history)

        this.setState({
            currentGame: data, activePanel: 'game', history: history,
            lastPanels: this.state.lastPanels.concat([this.state.activePanel])
        }, () => {
            window.scrollY = 0
        })
    }

    openCategory(category) {
        this.setState({
            category: category, activePanel: 'category',
            lastPanels: this.state.lastPanels.concat(['categories'])
        })
    }

    go(e) {
        this.setActivePanel(e.currentTarget.dataset.to, e.currentTarget.dataset.story);
    }

    back() {
        this.setState({
            activePanel: this.state.lastPanels[this.state.lastPanels.length - 1],
            lastPanels: this.state.lastPanels.slice(0, this.state.lastPanels.length - 1)
        });
    }

    render() {
        if (this.state.loading) return <ServiceLoader/>

        return <Fade in={true} timeout={1000}>
            <Epic activeStory={this.state.activeStory} tabbar={
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
                        selected={this.state.activeStory === 'profile'}
                        data-story="profile"
                        label={this.state.products.length && this.state.activeStory !== 'profile' ?
                            this.state.products.length : null}
                        text="Профиль">
                        <Icon28UserCircleOutline/>
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
                        <Main tabs={this.state.tabs} games={this.state.games} newGames={this.state.newGames}
                              isProductInBasket={this.isProductInBasket}/>
                    </Panel>
                    <Panel id="game">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>
                            {this.state.currentGame.name}
                        </PanelHeader>
                        <Game data={this.state.currentGame} go={this.go} back={this.back}
                              isProductInBasket={this.isProductInBasket} switchProduct={this.switchProduct}/>
                    </Panel>
                    <Panel id="screenshots">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>Скриншоты</PanelHeader>
                        <Screenshots data={this.state.currentGame}/>
                    </Panel>
                </View>
                <View id="categories" activePanel={this.state.activePanel}>
                    <Panel id="categories">
                        <PanelHeader>Категории игр</PanelHeader>
                        <Categories categories={this.state.categories} openCategory={this.openCategory}/>
                    </Panel>
                    <Panel id="category">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>
                            {this.state.category.title}
                        </PanelHeader>
                        <Category category={this.state.category} openGame={this.openGame}/>
                    </Panel>
                    <Panel id="game">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>
                            {this.state.currentGame.name}
                        </PanelHeader>
                        <Game data={this.state.currentGame} go={this.go} back={this.back}
                              isProductInBasket={this.isProductInBasket} switchProduct={this.switchProduct}/>
                    </Panel>
                    <Panel id="screenshots">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>Скриншоты</PanelHeader>
                        <Screenshots data={this.state.currentGame}/>
                    </Panel>
                </View>
                <View id="search" activePanel={this.state.activePanel}>
                    <Panel id="search">
                        <PanelHeader>Поиск</PanelHeader>
                        <Search categories={this.state.categories} openCategory={this.openCategory}
                                openGame={this.openGame}/>
                    </Panel>
                    <Panel id="game">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>
                            {this.state.currentGame.name}
                        </PanelHeader>
                        <Game data={this.state.currentGame} go={this.go} back={this.back}
                              isProductInBasket={this.isProductInBasket} switchProduct={this.switchProduct}/>
                    </Panel>
                    <Panel id="screenshots">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>Скриншоты</PanelHeader>
                        <Screenshots data={this.state.currentGame}/>
                    </Panel>
                </View>
                <View id="profile" activePanel={this.state.activePanel}>
                    <Panel id="profile">
                        <PanelHeader>Профиль</PanelHeader>
                        <Profile products={this.state.products} go={this.go}
                                 switchProduct={this.switchProduct} openGame={this.openGame}/>
                    </Panel>
                    <Panel id="history">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>История просмотров</PanelHeader>
                        <History history={this.state.history} go={this.go} openGame={this.openGame}/>
                    </Panel>
                    <Panel id="game">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>
                            {this.state.currentGame.name}
                        </PanelHeader>
                        <Game data={this.state.currentGame} go={this.go} back={this.back}
                              isProductInBasket={this.isProductInBasket} switchProduct={this.switchProduct}/>
                    </Panel>
                    <Panel id="screenshots">
                        <PanelHeader left={<PanelHeaderBack onClick={this.back}/>}>Скриншоты</PanelHeader>
                        <Screenshots data={this.state.currentGame}/>
                    </Panel>
                </View>
                <View id="settings" activePanel={this.state.activePanel}>
                    <Panel id="settings">
                        <PanelHeader>Настройки</PanelHeader>
                        <Settings darkTheme={this.state.darkTheme} setTheme={this.setTheme}/>
                    </Panel>
                </View>
            </Epic>
        </Fade>
    }
}

export default App;
