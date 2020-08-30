import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Div} from "@vkontakte/vkui";
import {Skeleton} from "@material-ui/lab";
import Fade from '@material-ui/core/Fade';
import {getRandomKey} from "../system/Utils";


import '../styles/CardElement.css';


class CardElement extends React.Component {
    addFadeAnimation(element, flag) {
        return flag ? <Fade in={true} timeout={1000}>{element}</Fade> : element;
    }

    template(image, title, description, button, platform, isCard) {
        platform = this.addFadeAnimation(platform, isCard);
        image = this.addFadeAnimation(<Card className="CardElement">{image}</Card>, isCard);
        title = this.addFadeAnimation(<Div className="CardTitle">{title}</Div>, isCard);
        description = this.addFadeAnimation(<Div className="CardDescription">{description}</Div>, isCard);
        button = this.addFadeAnimation(button, isCard);

        return <div className="CardContainer">
            {platform}
            {image}
            <div className="CardTextContainer">{title} {description}</div>
            {button}
        </div>;
    }

    getSkeleton() {
        return this.template(
            <Skeleton className="CardElementImage" variant="rect"/>,
            <Skeleton width={`${Math.round(90 - Math.random() * 30)}%`}/>,
            <div>
                <Skeleton height={10} width="100%"/>
                <Skeleton height={10} width={`${Math.round(Math.random() * 50 + 20)}%`}/>
                <Skeleton height={10} width={`${Math.round(Math.random() * 80 + 10)}%`}/>
            </div>,
            <Div className="CardButtonSkeleton">
                <Skeleton variant="rect" height={30} width="100%"/>
            </Div>, null,
            false
        )
    }

    getCard(image, title, description, buttons, platform) {
        return this.template(
            <div className="CardElementImage CardElementBackground" style={{
                background: `url(${image})`
            }}/>,
            title, description,
            <div className="CardButtonContainer">
                {buttons.map(button =>
                    <Button key={getRandomKey()} onClick={button.callback}
                            className="CardButton" mode={this.props.isProductInBasket() ? 'secondary': button.color}
                            stretched>
                        {this.props.isProductInBasket() ? 'Открыть' : button.label}
                    </Button>)}
            </div>,
            <div className="CardButtonPlatform">{platform}</div>,
            true
        )
    }

    render() {
        return this.props.skeleton ? this.getSkeleton() : this.getCard(
            this.props.element.image, this.props.element.name,
            this.props.element.description, this.props.element.buttons,
            this.props.element.platform
        )
    }
}


CardElement.propTypes = {
    element: PropTypes.object,
    skeleton: PropTypes.bool
};

export default CardElement;
