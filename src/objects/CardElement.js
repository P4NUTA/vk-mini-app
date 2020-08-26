import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Div} from "@vkontakte/vkui";
import {Skeleton} from "@material-ui/lab";
import Fade from '@material-ui/core/Fade';

import '../styles/CardElement.css';
import {getRandomKey} from "./Utils";


class CardElement extends React.Component {
    addFadeAnimation(element, flag) {
        return flag ? <Fade in={true} timeout={1000}>{element}</Fade> : element;
    }

    template(image, title, description, button, isCard) {
        image = this.addFadeAnimation(<Card className="CardElement">{image}</Card>, isCard);
        title = this.addFadeAnimation(<Div className="CardTitle">{title}</Div>, isCard);
        description = this.addFadeAnimation(<Div className="CardDescription">{description}</Div>, isCard);
        button = this.addFadeAnimation(button, isCard);

        return <div className="CardContainer">
            {image} {title} {description} {button}
        </div>;
    }

    getSkeleton() {
        return this.template(
            <Skeleton className="CardElementImage" variant="rect"/>,
            <Skeleton width={`${Math.round(90 - Math.random() * 30)}%`}/>,
            <div>
                <Skeleton height={10} width="100%"/>
                <Skeleton height={10} width={`${Math.round(Math.random() * 50 + 20)}%`}/>
            </div>,
            <Div className="CardButtonSkeleton">
                <Skeleton variant="rect" height={30} width="100%"/>
            </Div>,
            false
        )
    }

    getCard(image, title, description, buttons) {
        return this.template(
            <div className="CardElementImage CardElementBackground" style={{
                background: `url(${image})`
            }}/>,
            title, description,
            <div className="CardButtonContainer">
                {buttons.map(button =>
                    <Button key={getRandomKey()} onClick={button.callback}
                            className="CardButton" mode={button.color} stretched>
                        {button.label}
                    </Button>
                )}
            </div>,
            true
        )
    }

    render() {
        return this.props.skeleton ? this.getSkeleton() : this.getCard(
            this.props.element.image, this.props.element.name,
            this.props.element.description, this.props.element.buttons
        )
    }
}


CardElement.propTypes = {
    element: PropTypes.object,
    skeleton: PropTypes.bool
};

export default CardElement;
