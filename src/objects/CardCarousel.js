import React from 'react';
import PropTypes from 'prop-types';
import {CardScroll} from "@vkontakte/vkui";

import CardElement from "./CardElement";
import {getRange} from "../system/Utils";

class CardCarousel extends React.Component {
    render() {
        return <CardScroll>
            {
                this.props.data && this.props.data.length ?
                    this.props.data.map(element => <CardElement
                        key={element.id} element={element}
                        isProductInBasket={() => this.props.isProductInBasket(element.id)}/>) :
                    getRange(10).map(index => <CardElement key={index} skeleton={true}/>)
            }
        </CardScroll>
    }
}


CardCarousel.propTypes = {
    data: PropTypes.array,
};

export default CardCarousel;
