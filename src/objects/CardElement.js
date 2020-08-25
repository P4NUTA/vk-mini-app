import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Div} from "@vkontakte/vkui";

import '../styles/CardElement.css';


const numberToBeauty = (number) => {
    const beautyNumber = number.toLocaleString().split(',').join(' ')
    return `${beautyNumber} ₽`
}

class CardElement extends React.Component {
    render() {
        return <div className="CardContainer">
            <Card className="CardElement" size="s">
                <div className="CardElementImage"
                     style={{
                         width: 144, height: 144,
                         background: `url(${this.props.element.image})`
                     }}/>
            </Card>
            <Div className="CardTitle">{this.props.element.name}</Div>
            <Div className="CardDescription">{this.props.element.description}</Div>
            <Button className="CardButton" mode="primary" stretched>
                {numberToBeauty(this.props.element.price)}
            </Button>
        </div>
    }
}


CardElement.propTypes = {
    element: PropTypes.object.isRequired,
};

export default CardElement;
