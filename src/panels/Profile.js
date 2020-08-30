import React from "react";
import {Avatar, Button, Counter, Group, Header, Placeholder, RichCell, SimpleCell} from "@vkontakte/vkui";
import {getRandomKey, priceToBeauty} from "../objects/Utils";
import Icon56GoodsCollection from '@vkontakte/icons/dist/56/goods_collection';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import Icon28CubeBoxOutline from '@vkontakte/icons/dist/28/cube_box_outline';
import Icon28MoneyTransferOutline from '@vkontakte/icons/dist/28/money_transfer_outline';
import Icon28HistoryBackwardOutline from '@vkontakte/icons/dist/28/history_backward_outline';


class Profile extends React.Component {
    render() {
        return <div>
            <Group>
                <Header mode="secondary">Меню</Header>
                <SimpleCell onClick={this.goNONE} data-to="account" expandable
                            before={<Icon28UserOutline/>}>Аккаунт</SimpleCell>
                <SimpleCell onClick={this.goNONE} data-to="orders" expandable
                            before={<Icon28MarketOutline/>}>Заказы</SimpleCell>
                <SimpleCell onClick={this.goNONE} data-to="preorders" expandable
                            before={<Icon28CubeBoxOutline/>}>Предзаказы</SimpleCell>
                <SimpleCell onClick={this.goNONE} data-to="personal" expandable
                            before={<Icon28MoneyTransferOutline/>}>Личный счет</SimpleCell>
                <SimpleCell onClick={this.props.go} data-to="history" expandable
                            before={<Icon28HistoryBackwardOutline/>}>История просмотров</SimpleCell>
            </Group>
            {
                this.props.products.length ?
                    <Group>
                        <Header mode="secondary" indicator={this.props.products.length ?
                            <Counter size="s"
                                     mode="prominent">{this.props.products.length}</Counter> : null}>
                            Корзина</Header>
                        {
                            this.props.products.map(product => <RichCell
                                disabled
                                multiline
                                key={getRandomKey()}
                                before={<Avatar className="GameImageAvatar" size={72}
                                                style={{'--avatar-image': `url(${product.image})`}}/>}
                                caption={product.genre + ' | ' + product.platform}
                                after={product.priceLabel}
                                actions={
                                    <React.Fragment>
                                        <Button onClick={() => this.props.openGame(product)}>
                                            Открыть</Button>
                                        <Button mode="secondary"
                                                onClick={() => this.props.switchProduct(product)}>
                                            Удалить</Button>
                                    </React.Fragment>
                                }
                            >{product.name}</RichCell>)
                        }

                        <Placeholder
                            className="GoodsPlaceholder"
                            icon={<Icon56GoodsCollection/>}
                            header="Ваш заказ"
                            action={<Button size="l" mode="commerce">Оформить заказ</Button>}
                        >
                            Итого, без доставки <Counter>{priceToBeauty(
                            this.props.products.reduce((a, b) => a + b.price, 0)
                        )}</Counter>
                        </Placeholder>
                    </Group> : null
            }
        </div>
    }
}

Profile.propTypes = {};

export default Profile;




