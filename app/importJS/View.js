view = {
    drawTable() {
        const mainObject = getMainObject();
        const newTable = document.querySelector('.new-table');
        newTable.innerHTML = '';
        // const tableHeader = document.createElement('tr');
        // tableHeader.classList.add('new-table__header');
        // newTable.appendChild(tableHeader);
        // const tableHeaderCellNumber = document.createElement('th');
        // tableHeaderCellNumber.classList.add('new-table__header-cell');
        // tableHeaderCellNumber.textContent= '№';
        // tableHeader.appendChild(tableHeaderCellNumber);
        // const tableHeaderCellOrderNumber = document.createElement('th');
        // tableHeaderCellOrderNumber.classList.add('new-table__header-cell');
        // tableHeaderCellOrderNumber.textContent = '№ заказа';
        // tableHeader.appendChild(tableHeaderCellOrderNumber);
        // const tableHeaderOrderInQueue = document.createElement('th');
        // tableHeaderOrderInQueue.classList.add('new-table__header-cell');
        // tableHeaderOrderInQueue.textContent='В очереди';
        // tableHeader.appendChild(tableHeaderOrderInQueue);
        // const tableHeaderOrderIsPreparing = document.createElement('tr');
        // tableHeaderOrderIsPreparing.classList.add('new-table__header-cell');
        // tableHeaderOrderIsPreparing.textContent = 'В наборе';
        // tableHeader.appendChild(tableHeaderOrderIsPreparing);
        // const tableHeaderTime = document.createElement('tr');
        // tableHeaderTime.classList.add('new-table__header-cell');
        // tableHeaderTime.textContent = 'Время набора';
        // tableHeader.appendChild(tableHeaderTime);


        newTable.insertAdjacentHTML('beforeend', '' +
            '                 <thead>' +
            '                    <tr class="new-table__header">\n' +
            '                        <th class="new-table__header-cell">№</th>\n' +
            '                        <th class="new-table__header-cell">Номер заказа</th>\n' +
            '                        <th class="new-table__header-cell">В очереди</th>\n' +
            '                        <th class="new-table__header-cell">В наборе</th>\n' +
            '                        <th class="new-table__header-cell">Завершен</th>\n' +
            '                        <th class="new-table__header-cell">Время</th>\n' +
            '                    </tr>' +
            '                 </thead>');

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
                    <tbody>
                        <tr class="new-table__row new-table__order-remade">
                            <td class="new-table__cell">${counter}</td>
                            <td class="new-table__cell">${item.orderNumber}</td>
                            <td class="new-table__cell">${inQueue}</td>
                            <td class="new-table__cell">${preparing}</td>
                            <td class="new-table__cell">${complete}</td>
                            <td class="new-table__cell">${time}</td>
                        </tr>
                    </tbody>`
                )
            } else if (item.date === parseInt(new Date().getDate()) && !item.expired && !item.messageSent) {
                newTable.insertAdjacentHTML('beforeend', `
                    <tbody>
                        <tr class="new-table__row new-table__order-normal">
                            <td class="new-table__cell">${counter}</td>
                            <td class="new-table__cell">${item.orderNumber}</td>
                            <td class="new-table__cell">${inQueue}</td>
                            <td class="new-table__cell">${preparing}</td>
                            <td class="new-table__cell">${complete}</td>
                            <td class="new-table__cell">${time}</td>
                        </tr>
                    </tbody>`
                )
            } else if (item.date === parseInt(new Date().getDate()) && !item.expired && item.messageSent) {
                newTable.insertAdjacentHTML('beforeend', `
                    <tbody>
                        <tr class="new-table__row new-table__order-warning">
                            <td class="new-table__cell">${counter}</td>
                            <td class="new-table__cell">${item.orderNumber}</td>
                            <td class="new-table__cell">${inQueue}</td>
                            <td class="new-table__cell">${preparing}</td>
                            <td class="new-table__cell">${complete}</td>
                            <td class="new-table__cell">${time}</td>
                        </tr>
                    </tbody>`
                )
            } else if (item.date === parseInt(new Date().getDate()) && item.expired && item.messageSent) {
                newTable.insertAdjacentHTML('beforeend', `
                    <tbody>
                        <tr class="new-table__row new-table__order-expired">
                            <td class="new-table__cell">${counter}</td>
                            <td class="new-table__cell">${item.orderNumber}</td>
                            <td class="new-table__cell">${inQueue}</td>
                            <td class="new-table__cell">${preparing}</td>
                            <td class="new-table__cell">${complete}</td>
                            <td class="new-table__cell">${time}</td>
                        </tr>
                    </tbody>`
                )

            }
            counter++;
        })

    },

    sendMessage(message) {
        const x = new XMLHttpRequest();
        x.open('GET', 'https://api.telegram.org/bot1018757013:AAEHO9accUhscieT0ArRq9iwUeat6BmEzOM/sendMessage?chat_id=-1001471677614&text=' + message);
        x.send();


    },

    sendMessages() {
        const mainObject = getMainObject();
        mainObject.orders.forEach((item) => {
            if (item.needMessage === true) {
                this.sendMessage('Заказ ' + item.orderNumber + ' в наборе уже более ' + mainObject.expirationTime / 60 + ' минут');
                //console.log('Заказ ' + item.orderNumber + ' в наборе уже более ' + mainObject.expirationTime / 60 + ' минут')
                item.messageSent = true;
                item.needMessage = false;
            }
        })
        setMainObject(mainObject);
    },

    setPlaceholders() {
        const mainObject = getMainObject();
        document.querySelector('.options__time-to-expire').placeholder = mainObject.expirationTime / 60;
        document.querySelector('.options__time-to-send-message').placeholder = mainObject.messageTime / 60;
        document.querySelector('.options__request-interval').placeholder = mainObject.requestInterval;
    }
}