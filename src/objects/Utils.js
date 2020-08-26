import {Colors} from "./Static";

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
        element.playersLabel = countToBeauty(element.players)
        element.buyersLabel = countToBeauty(element.buyers)
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

