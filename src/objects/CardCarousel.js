import React from 'react';
import PropTypes from 'prop-types';
import {CardScroll} from "@vkontakte/vkui";
import CardElement from "./CardElement";

class CardCarousel extends React.Component {
    render() {
        return this.props.data.length && <CardScroll>
            {this.props.data.map(element => <CardElement element={element}/>)}
        </CardScroll>
    }
}


CardCarousel.propTypes = {
    data: PropTypes.array.isRequired,
};

export default CardCarousel;
