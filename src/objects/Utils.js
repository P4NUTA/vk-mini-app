import {Colors} from "./Static";
import bridge from "@vkontakte/vk-bridge";
import React from "react";

export class Icon extends React.Component {
    render() {
        const iconSize = isNumber(this.props.size) ? this.props.size : 28;
        const paddingSize = isNumber(this.props.padding) ? this.props.padding : 8;
        const iconColor = this.props.color ? this.props.color : null;

        const iconStyle = {
            '--icon-size': `${iconSize}px`,
            '--icon-padding-size': `${paddingSize}px`,
            '--icon-color': iconColor
        };

        return <div className="CustomIconContainer" style={iconStyle}>{this.props.children}</div>
    }
}

export const SystemStorage = {
    local: {
        set: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        get: (name) => JSON.parse(localStorage.getItem(name))
    },

    vk: {
        set: (name, value) => bridge.send("VKWebAppStorageSet",
            {"key": name, "value": JSON.stringify(value)})
            .catch(error => console.log(['ERROR WITH SET:', name, value, error])),
        get: async (name) => {
            return await bridge.send("VKWebAppStorageGet", {"keys": [name,]})
                .then(data => data.keys[0].value)
                .then(value => value ? JSON.parse(value) : null)
                .catch(error => console.log(['ERROR WITH GET:', name, error]));
        }
    }
}

export function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

export function getRange(from, to) {
    if (to === undefined) {
        to = from;
        from = 0;
    }
    return Array.from(Array(to - from).keys()).map(index => index + from)
}

export function priceToBeauty(number) {
    const beautyNumber = number.toLocaleString().split(',').join(' ')
    return `${beautyNumber} ₽`
}

export function countToBeauty(number) {
    if (number >= 1000) return (`${Math.round(number / 100) / 10}K`)
        .split('.').join(',')
    else return number
}

export function convertPrices(data, callback) {
    return data.map(element => {
        // element.playersLabel = countToBeauty(element.players)
        // element.buyersLabel = countToBeauty(element.buyers)
        element.priceLabel = priceToBeauty(element.price)

        element.buttons = [{
            label: priceToBeauty(element.price),
            color: Colors.card.button.dark,
            callback: () => callback(element)
        }];
        return element;
    })
}

export function getRandomKey() {
    return Math.random() * 10 ** 16;
}

export function resizeArray(array, size) {
    return getRange(Math.ceil(size / array.length))
        .reduce(obj => obj.concat(array), [])
        .slice(0, size);
}

export function openImage(index, images) {
    bridge.send("VKWebAppShowImages",
        {start_index: index, images: images})
        .then(response => console.log(response))
        .catch(error => console.log(error))
}

export function formatGame(data) {
    return {
        id: data.article,
        name: data.title,
        description: data.description,
        image: data.logo,
        url: data.url,
        price: data.price,
        currency: data.currency,
        screenshots: data.screenshots,
        genre: data.genre,
        age_limit: data.age_limit,
        language: data.language,
        platform: data.platform,
        publisher: data.publisher,
        release_date: data.release_date
    }
}
