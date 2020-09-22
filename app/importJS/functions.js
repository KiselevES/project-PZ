function getMainObject() {
    return JSON.parse(localStorage.getItem('mainObject'));
}

function isMainObjectExists() {
    return localStorage.getItem('mainObject') !== null;
}

function setMainObject(mainObject) {
    localStorage.setItem('mainObject', JSON.stringify(mainObject));
}

function ismainObjectContainsOrder(mainObject, orderNumber) {
    for (let i = 0; i < mainObject.orders.length; i++) {
        if (mainObject.orders[i].orderNumber === orderNumber) {
            return true;
        }
    }
    return false;
}

function getSameOrder(newContentObject, orderNumber) {
    for (let i = 0; i < newContentObject.orders.length; i++) {
        if (newContentObject.orders[i].orderNumber === orderNumber) {
            return newContentObject.orders[i].orderNumber;
        }
    }
    return false;
}

function isOrderRemade(mainObject, orderNumber) {
    for (let i = 0; i < mainObject.orders.length; i++) {
        if (mainObject.orders[i].orderNumber === orderNumber && mainObject.orders[i].complete === true) {
            return true;
        }
    }
    return false;
}

function secondsTimeToNormal(seconds) {
    let minutes = Math.floor(seconds / 60) + '';
    let secs = seconds % 60 + '';
    if (secs.length < 2) {
        secs = '0' + secs;
    }
    const result = minutes + ':' + secs;
    return result;
}