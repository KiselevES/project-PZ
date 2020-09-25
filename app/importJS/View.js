const view = {
    drawTable() {
        const mainObject = getMainObject();
        const newTable = document.querySelector('.new-table');
        let counter = 1;
        mainObject.orders.forEach((item) => {

            let inQueue = '';
            if (item.inQueue === true) {
                inQueue = 'X';
            }
            let preparing = '';
            if (item.preparing === true) {
                preparing = 'X';
            }
            let complete = '';
            if (item.complete === true) {
                complete = 'X';
            }
            let time = secondsTimeToNormal(item.completeTime);
            if (item.date === parseInt(new Date().getDate()) && item.remade && !item.messageSent) {
                newTable.insertAdjacentHTML('beforeend', `
                    <tbody class="new-table__tbody">
                        <tr class="new-table__row new-table__order-remade">
                            <td class="new-table__cell">${counter++}</td>
                            <td class="new-table__cell">${item.orderNumber}</td>
                            <td class="new-table__cell">${inQueue}</td>
                            <td class="new-table__cell">${preparing}</td>
                            <td class="new-table__cell">${complete}</td>
                            <td class="new-table__cell">${time}</td>
                        </tr>
                    </tbody>`
                );

            } else if (item.date === parseInt(new Date().getDate()) && !item.expired && !item.messageSent) {
                newTable.insertAdjacentHTML('beforeend', `
                    <tbody class="new-table__tbody">
                        <tr class="new-table__row new-table__order-normal">
                            <td class="new-table__cell">${counter++}</td>
                            <td class="new-table__cell">${item.orderNumber}</td>
                            <td class="new-table__cell">${inQueue}</td>
                            <td class="new-table__cell">${preparing}</td>
                            <td class="new-table__cell">${complete}</td>
                            <td class="new-table__cell">${time}</td>
                        </tr>
                    </tbody>`
                );

            } else if (item.date === parseInt(new Date().getDate()) && !item.expired && item.messageSent) {
                newTable.insertAdjacentHTML('beforeend', `
                    <tbody class="new-table__tbody">
                        <tr class="new-table__row new-table__order-warning">
                            <td class="new-table__cell">${counter++}</td>
                            <td class="new-table__cell">${item.orderNumber}</td>
                            <td class="new-table__cell">${inQueue}</td>
                            <td class="new-table__cell">${preparing}</td>
                            <td class="new-table__cell">${complete}</td>
                            <td class="new-table__cell">${time}</td>
                        </tr>
                    </tbody>`
                );

            } else if (item.date === parseInt(new Date().getDate()) && item.expired && item.messageSent) {
                newTable.insertAdjacentHTML('beforeend', `
                    <tbody class="new-table__tbody">
                        <tr class="new-table__row new-table__order-expired">
                            <td class="new-table__cell">${counter++}</td>
                            <td class="new-table__cell">${item.orderNumber}</td>
                            <td class="new-table__cell">${inQueue}</td>
                            <td class="new-table__cell">${preparing}</td>
                            <td class="new-table__cell">${complete}</td>
                            <td class="new-table__cell">${time}</td>
                        </tr>
                    </tbody>`
                );

            }

        })

    },

    setTimer() {
        const mainObject = getMainObject();
        document.querySelectorAll('.new-table__tbody').forEach((item) => {
            if (item.children[0].children[4].innerHTML.length === 0) {
                setInterval(()=>{
                    let unixTime = 0;
                    let orderNumber = parseInt(item.children[0].children[1].innerHTML);
                    for(let i = 0; i < mainObject.orders.length; i++){
                        if(mainObject.orders[i].orderNumber == orderNumber){
                            unixTime = mainObject.orders[i].unixTime;
                        }
                    }
                    let currentUnixTime = parseInt(new Date().getTime() / 1000);
                    item.children[0].children[5].innerHTML = secondsTimeToNormal(currentUnixTime - unixTime);
                },1000)
            }
        })
    },

    sendMessage(message) {
        const x = new XMLHttpRequest();
        x.open('GET', 'https://api.telegram.org/bot1018757013:AAEHO9accUhscieT0ArRq9iwUeat6BmEzOM/sendMessage?chat_id=-1001471677614&text=' + message);
        x.send();


    }
    ,

    sendMessages() {
        const mainObject = getMainObject();
        mainObject.orders.forEach((item) => {
            if (item.needMessage === true) {
                if (mainObject.telegram) {
                    this.sendMessage('Заказ ' + item.orderNumber + ' в наборе уже более ' + mainObject.messageTime / 60 + ' минут');
                    //console.log('Заказ ' + item.orderNumber + ' в наборе уже более ' + mainObject.expirationTime / 60 + ' минут')
                }
                item.messageSent = true;
                item.needMessage = false;
            }
        })
        setMainObject(mainObject);
        //console.log(mainObject);
    }
    ,

    setPlaceholders() {
        const mainObject = getMainObject();
        document.querySelector('.options__time-to-expire').placeholder = mainObject.expirationTime / 60;
        document.querySelector('.options__time-to-send-message').placeholder = mainObject.messageTime / 60;
        document.querySelector('.options__request-interval').placeholder = mainObject.requestInterval;
    }
    ,

    telegramCheckbox() {
        const mainObject = getMainObject();
        const checkBox = document.querySelector('.telegram__checkbox');
        if (mainObject.telegram) {
            checkBox.setAttribute('checked', 'true');
        } else {
            checkBox.removeAttribute('checked');
        }
    }
}