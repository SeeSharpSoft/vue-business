export function setStyleClass(domElement, sStyleClass, bSet) {
    if (domElement) {
        domElement.classList[bSet ? 'add' : 'remove'](sStyleClass);
    }
}

export function setAttribute(domElement, sAttributeName, vValue) {
    if (domElement) {
        domElement[vValue === undefined || vValue === null ? 'removeAttribute' : 'setAttribute'](sAttributeName, vValue)
    }
}

export function createEvent(sender, data) {
    return {
        sender: sender,
        data: data
    }
}
