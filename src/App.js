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
    Placeholder,
    Switch,
    Tabbar,
    TabbarItem,
    View,
    ScreenSpinner
} from "@vkontakte/vkui";

import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon56UsersOutline from '@vkontakte/icons/dist/56/users_outline';

import Home from './panels/Home';
import Main from './panels/Main';
import Categories from './panels/Categories';

import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStory: 'home',
            activePanel: 'home',
            user: null,
            popout: <ScreenSpinner size='large' />,
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
                    selected={this.state.activeStory === 'home'}
                    data-story="home"
                    text="Дом"
                ><Icon28HomeOutline/></TabbarItem>
                <TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'main'}
                    data-story="main"
                    text="Главная"
                ><Icon28ArticleOutline/></TabbarItem>
                <TabbarItem
                    onClick={this.onStoryChange}
                    selected={this.state.activeStory === 'settings'}
                    data-story="settings"
                    text="Настройки"
                ><Icon28SettingsOutline/></TabbarItem>
            </Tabbar>
        }>
            <View id="home" activePanel={this.state.activePanel} popout={this.state.popout}>
                <Home id='home' user={this.state.user} go={this.go}/>
                <Main id='main' go={this.go}/>
                <Categories id='categories' go={this.go}/>
            </View>
            <View id="main" activePanel="main">
                <Panel id="main">
                    <PanelHeader>Главная</PanelHeader>
                    <Group>
                        <Placeholder
                            icon={<Icon56UsersOutline/>}
                            header="Уведомления от сообществ"
                            action={<Button size="l">Подключить сообщества</Button>}
                        >
                            Подключите сообщества, от которых Вы хотите получать уведомления
                        </Placeholder>
                    </Group>
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

