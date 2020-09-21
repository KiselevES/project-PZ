const model = {


    callExternalContent() {
        return new Promise((resolve, reject) => {
            const x = new XMLHttpRequest();

            //ajax запрос через прокси cors-anywhere
            //x.open('GET', 'https://cors-anywhere.herokuapp.com/https://akson.ru/personal/order/table1/?STORE_ID=11');
            x.open('GET', 'pz4.html');

            //x.timeout = 5000;
            x.send();
            x.onload = () => {
                if (x.status != 200) {
                    reject(x.statusText)
                } else {
                    resolve(x.responseText || '');
                }
            };
        })
    },
    //
    getContent(externalContent) {
        //вытаскиваем таблицу из исходного кода
        const cutExternalContent = externalContent.substr(3196, externalContent.length - 3370);
        //console.log(cutExternalContent);
        const hiddenTable = document.querySelector('.hidden-table');
        hiddenTable.innerHTML = cutExternalContent;
        //вытаскиваем строки
        const rows = document.getElementsByTagName('tr');
        //переменная для строк фильтрованной таблицы
        let filteredRows = [];

        //удаляем строки заголовков таблиц, удаляем отмененные заказы, формируем одну таблицу из двух
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].innerHTML.length !== 377) {
                if (rows[i].children[3].innerHTML.length > 100) {
                    rows[i].parentNode.removeChild(rows[i]);
                } else {
                    filteredRows.push(rows[i]);
                }
            }
        }
        //удаляем четвертую ячейку
        for (let i = 0; i < filteredRows.length; i++) {
            filteredRows[i].removeChild(filteredRows[i].children[3]);
        }

        const newContentObject = new mainObjectClass();
        filteredRows.forEach((item) => {
            const orderNumber = parseInt(item.children[0].children[0].children[0].innerHTML);
            const order = new orderClass(orderNumber);
            //console.log(item.children[1].children[0].innerHTML.length);
            if (item.children[1].children[0].innerHTML.length > 30) {
                order.setQueue();
            } else if (item.children[2].children[0].innerHTML.length > 30) {
                order.setPreparing();
            }
            newContentObject.orders.push(order);
        })

        //удаляем таблицу
        hiddenTable.innerHTML = '';

        if (!isMainObjectExists()) {
            setMainObject(newContentObject);
            this.getContent(externalContent);
        } else {
            const notFormattedmainObject = getMainObject();
            const mainObject = new mainObjectClass();

            mainObject.requestInterval = notFormattedmainObject.requestInterval;
            mainObject.messageTime = notFormattedmainObject.messageTime;
            mainObject.expirationTime = notFormattedmainObject.expirationTime;

            notFormattedmainObject.orders.forEach((item) => {
                let currentOrder = new orderClass(item.orderNumber);
                currentOrder.expired = item.expired;
                currentOrder.messageSent = item.messageSent;
                currentOrder.complete = item.complete;
                currentOrder.completeTime = item.completeTime;
                currentOrder.inQueue = item.inQueue;
                currentOrder.preparing = item.preparing;
                currentOrder.remade = item.remade;
                currentOrder.unixTime = item.unixTime;
                currentOrder.date = item.date;
                currentOrder.needMessage = item.needMessage;
                mainObject.orders.push(currentOrder);
            })


            // Добавляем новые заказы
            newContentObject.orders.forEach((item, i) => {
                if (!ismainObjectContainsOrder(mainObject, item.orderNumber)) {
                    mainObject.orders.push(newContentObject.orders[i]);
                }
            })
            //если старого заказа нет в списке заказов нового объекта, помечаем старый подтвержденным
            mainObject.orders.forEach((item) => {
                if (!getSameOrder(newContentObject, item.orderNumber)) {
                    item.setComplete();
                }
            })
            //получаем перевыгруженные заказы
            newContentObject.orders.forEach((item) => {
                if (isOrderRemade(mainObject, item.orderNumber)) {
                    for (let i = 0; i < mainObject.orders.length; i++) {
                        if (mainObject.orders[i].orderNumber === item.orderNumber) {
                            mainObject.orders[i].setRemade();
                            mainObject.orders[i].expired = item.expired;
                            mainObject.orders[i].messageSent = false;
                            mainObject.orders[i].unixTime = parseInt(new Date().getTime() / 1000);
                            mainObject.orders[i].complete = false;
                            mainObject.orders[i].completeTime = 0;
                            mainObject.orders[i].inQueue = item.inQueue;
                            mainObject.orders[i].preparing = item.preparing;
                            mainObject.orders[i].date = item.date;
                            mainObject.orders[i].needMessage = item.needMessage;
                        }
                    }
                }
            })

            //задаем время наборки
            mainObject.orders.forEach((item) => {
                if (item.complete === false) {
                    item.setTime(parseInt(new Date().getTime() / 1000));
                }
            })

            //проверяем на просрочку

            mainObject.orders.forEach((item) => {
                if (item.completeTime > mainObject.expirationTime) {
                    item.setExpired();
                }
            })

            //удаляем заказы возрастом более 10 дней
            for (let i = mainObject.orders.length - 1; i >= 0; i--) {
                if (parseInt(new Date().getTime() / 1000) - mainObject.orders[i].unixTime > 864000) {
                    mainObject.orders.splice(i, 1);
                }
            }


            setMainObject(mainObject);
            console.log(mainObject);
        }
    },

    getWarning() {
        const mainObject = getMainObject();
        mainObject.orders.forEach((item) => {
            if (parseInt(new Date().getTime() / 1000) - item.unixTime > mainObject.messageTime) {
                item.needMessage = true;
            }
        })
        setMainObject(mainObject);
    }
}