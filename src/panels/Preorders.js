import React from "react";
import {Button, Group, Placeholder} from "@vkontakte/vkui";
import Icon56RecentOutline from '@vkontakte/icons/dist/56/recent_outline';

class Preorders extends React.Component {
    render() {
        return <Group>
            <Placeholder
                icon={<Icon56RecentOutline/>}
                header="Предзаказы отсутствуют"
                action={<Button size="l" mode="outline" onClick={this.props.go}
                                data-to="main" data-story="main"
                >Купить игру</Button>}>
                Выбирайте игры из огромного списка
            </Placeholder>
        </Group>
    }
}

Preorders.propTypes = {};

export default Preorders;




