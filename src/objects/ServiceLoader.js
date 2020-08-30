import React from "react";
import {Panel, PanelHeader, Placeholder, View} from "@vkontakte/vkui";
import Icon36GameOutline from '@vkontakte/icons/dist/36/game_outline';


const ServiceLoader = () => {
    return <View activePanel="loader">
        <Panel className="animated fadeIn go" id="loader">
            <PanelHeader className="ServiceLoaderHeader CustomPanelHeader">GamePark</PanelHeader>
            <Placeholder className="ServiceLoader" icon={
                <Icon36GameOutline className="GameParkPlayIcon" width={82} height={82}/>
            }/>
        </Panel>
    </View>
}

export default ServiceLoader;