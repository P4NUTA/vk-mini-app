import React from "react";
import {Avatar, Button, Group, Header, Placeholder, RichCell} from "@vkontakte/vkui";
import {getRandomKey} from "../system/Utils";
import Fade from "@material-ui/core/Fade";

import Icon56DocumentOutline from '@vkontakte/icons/dist/56/document_outline';


class History extends React.Component {
    render() {
        return <Fade in={true} timeout={600}>
            {
                this.props.history.length ?
                    <Group>
                        <Header mode="secondary" indicator={this.props.history.length ?
                            this.props.history.length : null}>
                            Последние просмотренные</Header>
                        {
                            this.props.history.map(product => <RichCell
                                disabled
                                multiline
                                key={getRandomKey()}
                                before={<Avatar size={72} src={product.image}/>}
                                caption={product.genre + ' | ' + product.platform}
                                after={product.priceLabel}
                                actions={
                                    <React.Fragment>
                                        <Button mode={this.props.isProductInBasket(product.id) ? 'primary': 'outline'}
                                                onClick={() => this.props.switchProduct(product)}>
                                            {this.props.isProductInBasket(product.id) ? 'Удалить': 'Добавить'}
                                        </Button>
                                        <Button mode="secondary" onClick={() => this.props.openGame(product, true)}>
                                            Открыть
                                        </Button>

                                    </React.Fragment>
                                }
                            >{product.name}</RichCell>)
                        }
                    </Group> : <Placeholder
                        icon={<Icon56DocumentOutline/>}
                        header="История пуста"
                        action={<Button size="l" mode="outline" onClick={this.props.go}
                                        data-to="main" data-story="main"
                        >Выбрать игру</Button>}>
                        Выбирайте игры из огромного списка
                    </Placeholder>
            }
        </Fade>
    }
}

History.propTypes = {};

export default History;




