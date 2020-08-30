import React from 'react';
import {Gallery} from "@vkontakte/vkui";

export function galleryNextButton(cls) {
    return (func) => cls.setState({nextCallback: func})
}

export function galleryBackButton(cls) {
    return (func) => cls.setState({backCallback: func})
}

class InfiniteGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastIndex: 1,
            slideIndex: 0,
        }

        this.onEnd = this.onEnd.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setIndex = this.setIndex.bind(this);
        this.nextButton = this.nextButton.bind(this);
        this.backButton = this.backButton.bind(this);

        if (this.props.next) this.props.next(this.nextButton)
        if (this.props.back) this.props.back(this.backButton)
    }

    setIndex(number) {
        const currentIndex = Math.max(0, Math.min(this.props.images.length - 1, number));
        this.onChange(currentIndex, () => this.onEnd({targetIndex: currentIndex}))
    }

    nextButton() {
        this.setIndex(this.state.slideIndex + 1);
    }

    backButton() {
        this.setIndex(this.state.slideIndex - 1);
    }

    onChange(number, callback) {
        this.setState({lastIndex: this.state.slideIndex, slideIndex: number}, callback)
    }

    onEnd({targetIndex}) {
        if (this.state.lastIndex === targetIndex && targetIndex === 0 && this.props.back) {
            this.setState({lastIndex: targetIndex, slideIndex: this.props.images.length - 1})

        } else if (this.state.lastIndex === targetIndex && this.props.next) {
            this.setState({lastIndex: targetIndex, slideIndex: 0})

        } else {
            this.setState({lastIndex: targetIndex})
        }
    }

    render() {
        return <Gallery className={this.props.className}
                        bullets={this.props.bullets}
                        align={this.props.align}
                        slideWidth={this.props.slideWidth}
                        slideIndex={this.state.slideIndex}
                        onChange={this.onChange}
                        onEnd={this.onEnd}
                        timeout={3000}
        >{this.props.children}</Gallery>
    }
}

InfiniteGallery.propTypes = {};

export default InfiniteGallery;
