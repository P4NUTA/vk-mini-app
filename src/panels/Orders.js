import React from "react";
import {Button, Group, Placeholder} from "@vkontakte/vkui";
import Icon56MarketLikeOutline from '@vkontakte/icons/dist/56/market_like_outline';

class Orders extends React.Component {
    render() {
        return <Group>
            <Placeholder
                icon={<Icon56MarketLikeOutline/>}
                header="Заказы отсутствуют"
                action={<Button size="l" mode="outline" onClick={this.props.go}
                                data-to="main" data-story="main"
                >Купить игру</Button>}>
                Выбирайте игры из огромного списка
            </Placeholder>
        </Group>
    }
}

Orders.propTypes = {};

export default Orders;




