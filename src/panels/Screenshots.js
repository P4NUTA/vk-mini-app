import React from 'react';
import {FixedLayout, Group, Header} from "@vkontakte/vkui";
import {animateScroll} from 'react-scroll'

import '../styles/Screenshots.css';
import SpeedDial from "@material-ui/lab/SpeedDial";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PhotosBlock from "../objects/PhotosBlock";
import Grow from "@material-ui/core/Grow";
import {openImage} from "../objects/Utils";
import InfiniteGallery from "../objects/InfiniteGallery";
import Fade from "@material-ui/core/Fade";


class Screenshots extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bestImages: this.props.data.screenshots.slice(0, 3),
            images: this.props.data.screenshots,
            isOnTop: true,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', (e) => {
            const isOnTop = window.scrollY === 0;
            if (this.state.isOnTop !== isOnTop) this.setState({isOnTop: isOnTop});
        });
    }

    render() {
        return <Fade in={true}>
            <div>
                <Group className="ScreenshotsBestGalleryGroup"
                       header={<Header>Лучшие скриншоты</Header>} separator="hide">
                    <InfiniteGallery className="ScreenshotsBestGallery"
                                     bullets="light"
                                     slideWidth="calc(100% - 16px)"
                                     timeout={3000}
                                     images={this.state.bestImages}>
                        {
                            this.state.bestImages.map((url, index) => <div
                                key={index} className="ScreenshotsBestImage"
                                onClick={() => openImage(index, this.state.bestImages)}
                                style={{backgroundImage: `url(${url})`}}/>)
                        }
                    </InfiniteGallery>
                </Group>

                <Group header={<Header indicator={this.state.images.length}>Все скриншоты</Header>}>
                    <PhotosBlock images={this.state.images}/>
                </Group>

                <FixedLayout vertical="bottom">
                    <Grow in={!this.state.isOnTop}>
                        <SpeedDial
                            className="ScreenshotsSpeedDial"
                            ariaLabel="ArrowToTop"
                            icon={<ArrowUpwardIcon/>}
                            onClick={animateScroll.scrollToTop}
                            open={false}
                            direction="up"
                        />
                    </Grow>
                </FixedLayout>
            </div>
        </Fade>
    }
}

Screenshots.propTypes = {};

export default Screenshots;
