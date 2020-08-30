import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, Div, FixedLayout, Gallery, Link, MiniInfoCell, Placeholder, Separator} from "@vkontakte/vkui";

import Icon28DevicesOutline from '@vkontakte/icons/dist/28/devices_outline';
import Icon28ChatsOutline from '@vkontakte/icons/dist/28/chats_outline';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24CameraOutline from '@vkontakte/icons/dist/24/camera_outline';
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';
import Icon24Hide from '@vkontakte/icons/dist/24/hide';
import Icon20ArticleOutline from '@vkontakte/icons/dist/20/article_outline';
import Icon20GlobeOutline from '@vkontakte/icons/dist/20/globe_outline';
import Icon20CommunityName from '@vkontakte/icons/dist/20/community_name';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import Icon20MentionOutline from '@vkontakte/icons/dist/20/mention_outline';


import '../styles/Game.css';
import {Icon, openImage} from "../objects/Utils";
import InfiniteGallery from "../objects/InfiniteGallery";
import Fade from "@material-ui/core/Fade";
import {Platforms} from "../objects/Static";


class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            snackbar: null,
        }

        this.openBase = this.openBase.bind(this);
    }

    openBase() {
        // if (this.state.snackbar) return;
        // this.setState({
        //     snackbar: <Snackbar
        //         layout="vertical"
        //         onClose={() => this.setState({snackbar: null})}
        //         before={<Avatar size={24} style={{backgroundColor: 'var(--button_commerce_background)'}}><
        //             Icon16Done fill="#fff" width={14} height={14}/>
        //         </Avatar>}
        //     >
        //         Успешно куплено
        //     </Snackbar>,
        //     bought: true,
        // });

        this.props.switchProduct(this.props.data);
    }

    render() {
        const game = this.props.data;
        const platformIcon = Platforms[game.platform];
        const ageLimit = game.age_limit.split(' ')[0];

        return <Fade in={true} timeout={600}>
            <div className="GameContainer">
                <Gallery className="GameLogoContainer">
                    <div className="GameLogo" style={{background: `url(${game.image})`}}/>
                </Gallery>
                {
                    game.description ? <MiniInfoCell className="GameInfoRow" before={<Icon20ArticleOutline/>}
                                                     multiline>{game.description}</MiniInfoCell> : null
                }
                {game.description ? <Separator className="GameInfoRow"/> : null}

                <MiniInfoCell className="GameInfoRow" before={<Icon20GlobeOutline/>}>
                    <Link href={game.url}>{game.url}</Link>
                </MiniInfoCell>

                <MiniInfoCell before={<Icon24Hide width={20} height={20}/>}
                              after={<Avatar className={`GameAgeRestrict GameAgeRestrict${ageLimit}`} size={24}>
                                  {game.age_limit}
                              </Avatar>}>
                    Возрастные ограничения
                </MiniInfoCell>

                <MiniInfoCell before={<Icon28DevicesOutline width={20} height={20}/>}
                              after={platformIcon ? <Icon size={24} color="#555e6b" padding={0}>
                                  {platformIcon}</Icon> : game.platform}>
                    {`Платформа`}
                </MiniInfoCell>

                <MiniInfoCell before={<Icon20MentionOutline width={20} height={20}/>}>
                    {`Жанр: ${game.genre}`}
                </MiniInfoCell>

                <MiniInfoCell before={<Icon28ChatsOutline width={20} height={20}/>}>
                    {`Язык: ${game.language}`}
                </MiniInfoCell>

                <MiniInfoCell before={<Icon20CommunityName width={20} height={20}/>}>
                    {`Издатель: ${game.publisher}`}
                </MiniInfoCell>

                <MiniInfoCell before={<Icon20CalendarOutline width={20} height={20}/>}>
                    {game.release_date}
                </MiniInfoCell>

                {
                    game.screenshots && game.screenshots.length ? <MiniInfoCell
                        className="GameScreenshotsInfoCell GameInfoRow"
                        before={<Icon24CameraOutline height={20} width={20}/>}
                        after={<Button mode="tertiary"><p>Все скриншоты</p> <Icon24Chevron
                            height={20} width={20}/></Button>}
                        onClick={this.props.go}
                        data-to="screenshots"
                    >Скриншоты</MiniInfoCell> : null
                }

                {
                    game.screenshots && game.screenshots.length ? <InfiniteGallery
                        className="GameShortScreenshotsGallery GameInfoRow"
                        bullets="light"
                        slideWidth="100%"
                        timeout={3000}
                        images={game.screenshots}
                        align="center">
                        {
                            game.screenshots.slice(0, game.screenshots.length - 1)
                                .map((url, index) => <div key={index}
                                                          onClick={() => openImage(index, game.screenshots)}
                                                          style={{backgroundImage: `url(${url})`}}/>)
                        }
                        <div className="GameShortGalleryLast"
                             style={{backgroundImage: `url(${game.screenshots[game.screenshots.length - 1]})`}}>
                            <Placeholder header="Лучшие подборки" action={
                                <Button className="GameShortGalleryShowAllEntry" size="s" mode="outline"
                                        onClick={this.props.go}
                                        data-to="screenshots">Смотреть все</Button>
                            }>
                                Мы постоянно обновляем и улучшаем наши подборки скриншотов
                            </Placeholder>
                        </div>
                    </InfiniteGallery> : null
                }

                <FixedLayout className="GameBuyBottomLayout" vertical="bottom">
                    <Div className="GameBuyBottomContainer">
                        <Button className="GameBuyBottomBack" size="l" onClick={this.props.back} mode="secondary">
                            <Icon28ChevronBack width={24} height={24}/>
                        </Button>
                        <Button mode={this.props.isProductInBasket(game.id) ? 'secondary' : 'primary'} size="l"
                                stretched onClick={this.openBase}>
                            {
                                this.props.isProductInBasket(game.id) ? 'Убрать' :
                                    `Купить за ${game.buttons[0].label}`
                            }
                        </Button>
                        {
                            this.props.isProductInBasket(game.id) ? <Button
                                className="GameGoToBasket"
                                mode="primary" size="l" data-to="profile" data-story="profile"
                                stretched onClick={this.props.go}>
                                Корзина
                            </Button> : null
                        }
                    </Div>
                </FixedLayout>

                {this.state.snackbar}
            </div>
        </Fade>
    }
}

Game.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Game;
