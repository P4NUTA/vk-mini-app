import {Cell, Group, Header, Separator, Switch} from "@vkontakte/vkui";
import React from "react";
import Fade from "@material-ui/core/Fade";


class Settings extends React.Component {
    render() {
        return <Fade in={true} timeout={600}>
            <Group header={<Header mode="secondary">Настройки приложения</Header>}>
                <Cell asideContent={<Switch disabled/>}>
                    Уведомления
                </Cell>
                <Cell asideContent={<Switch />}>
                    Фильтрация игр
                </Cell>
                <Cell asideContent={<Switch defaultChecked/>}>
                    Скриншоты
                </Cell>
                <Separator/>
                <Cell asideContent={
                    <Switch defaultChecked={this.props.darkTheme}
                            value={this.props.darkTheme}
                            onClick={() => this.props.setTheme(
                                this.props.darkTheme ? 'bright_light' : 'space_gray'
                            )}/>
                }>Темная тема</Cell>
            </Group>
        </Fade>
    }
}

Settings.propTypes = {};

export default Settings;







