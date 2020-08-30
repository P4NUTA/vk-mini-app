import React from "react";
import {Counter, Group, Placeholder} from "@vkontakte/vkui";
import Icon56PaymentCardOutline from '@vkontakte/icons/dist/56/payment_card_outline';
import {priceToBeauty} from "../system/Utils";

class Personal extends React.Component {
    render() {
        const date = new Date();
        const params = date.toISOString().split('T')[0].split('-');

        return <Group>
            <Placeholder
                className="GoodsPlaceholder"
                icon={<Icon56PaymentCardOutline/>}
                header="Состояние счёта">
                На вашем счету {<Counter style={{marginBottom: 12}}>
                {priceToBeauty(1374)}
            </Counter>} Последнее
                обновление {`${params[2]}.${params[1]}.${params[0]}`}
            </Placeholder>
        </Group>
    }
}

Personal.propTypes = {};

export default Personal;




