document.addEventListener("DOMContentLoaded", () => {

    model.callExternalContent()
        .then((response) => {
            model.getContent(response);
        })
        .then((mainObject)=> {
            view.drawTable(mainObject);
        })








    // // Функция перевода количества секунд в минуты и секунды
//     function unixTimeToNormal(seconds) {
//         let minutes = Math.floor(seconds / 60) + '';
//         let secs = seconds % 60 + '';
//         if (secs.length < 2) {
//             secs = '0' + secs;
//         }
//         return result = minutes + ':' + secs
//     }
//
// //---добавляем функцию проверки наличия заказа в session storage
//     function isOrderNumberInSessionStorage(orderNumber) {
//         if (sessionStorage.getItem(orderNumber)) {
//             return true;
//         } else {
//             return false;
//         }
//     }
//
// //функция проверяет наличие заказа в строке "отправить" в session storage
//     function isAddedToSendString(orderNumber) {
//         let text = sessionStorage.getItem('to-send');
//         if (text) {
//             let ordersArray = text.split('|');
//             for (i = 0; i < ordersArray.length; i++) {
//                 if (orderNumber === parseInt(ordersArray[i])) {
//                     return true
//                 }
//             }
//         }
//     }
//
// //Функция оверяет наличие заказа в строке просроченных в session storage
//     function isAdded(orderNumber) {
//         let text = sessionStorage.getItem('expired');
//         if (text) {
//             let ordersArray = text.split('|');
//             for (i = 0; i < ordersArray.length; i++) {
//                 if (orderNumber === parseInt(ordersArray[i])) {
//                     return true
//                 }
//             }
//         }
//         return false
//     }
//
// //Функция получения данных
//     function callExternalContent() {
//         return new Promise((resolve, reject) => {
//             const x = new XMLHttpRequest();
//
//             //ajax запрос через прокси cors-anywhere
//             x.open('GET', 'https://cors-anywhere.herokuapp.com/https://akson.ru/personal/order/table1/?STORE_ID=11');
//             //x.open('GET', 'pz.html');
//             //x.open('GET', 'pz2.html');
//             //x.timeout = 5000;
//             x.send();
//             x.onload = () => {
//                 if (x.status != 200) {
//                     reject(x.statusText)
//                 } else {
//                     resolve(x.responseText || '');
//                 }
//             };
//         })
//     }
//
// //Функция проверки наличия строки expired в session storage
//     function doesSessionStorageContainsExpiredString() {
//         if (sessionStorage.getItem('expired')) {
//             return true;
//         } else {
//             return false
//         }
//     }
//
// //Функция проверки наличия строки "отправить" в session storage
//     function doesSessionStorageContainsToSendString() {
//         if (sessionStorage.getItem('to-send')) {
//             return true;
//         } else {
//             return false
//         }
//     }
//
// //Функция проверки наличия строки "отправлено" в session storage
//     function doesSessionStorageContainsSentString() {
//         if (sessionStorage.getItem('sent')) {
//             return true;
//         } else {
//             return false
//         }
//     }
//
// //Функция отправки сообщения в Telegram канал
//     function sendMessage(message) {
//         return new Promise((resolve, reject) => {
//             const x = new XMLHttpRequest();
//             x.open('GET', 'https://api.telegram.org/bot1018757013:AAEHO9accUhscieT0ArRq9iwUeat6BmEzOM/sendMessage?chat_id=-1001471677614&text=' + message);
//             x.send();
//             x.onload = () => {
//                 if (x.status != 200) {
//                     reject(x.statusText)
//                 } else {
//                     resolve(x.responseText || '');
//                 }
//             };
//         })
//     }
//
// //время до просрочки в секундах
//     let timeToExpire = 1800;
//     const timeToExpireInput = document.querySelector('.options__time-to-expire');
//     const timeToExpireButton = document.querySelector('.options__time-to-expire-button');
//     timeToExpireButton.addEventListener('click', (e) => {
//         e.preventDefault();
//         timeToExpire = timeToExpireInput.value * 60;
//     })
//
// //время до отправки сообщения в секундах
//     let timeToSendMessage = 20;
//
// //временной интервал между запросами на сервер
//     let requestInterval = 10;
//
// //массив с заказами для отправки сообщения
//     let ordersToTelegram = [];
//
// //переменная для получения исходных данных
//     let externalContent = '';
//
// //создаем переменную для скрытой исходной таблицы
//     const table = document.querySelector('.table');
//
// //здаем переменную для строки просроченных заказов
//     const expiredOrders = document.querySelector('.expired-orders');
//
//
//     //последовательность асинхронных операций
//     callExternalContent()
//         .then(result => {
//                 externalContent = result;
//             },
//             error => console.log('Error' + ': ' + error))
//         .then(() => {
//             //вытаскиваем таблицу из исходного кода
//             externalContent = externalContent.substr(3476, externalContent.length - 3704);
//             table.innerHTML = externalContent;
//             //вытаскиваем строки
//             const rows = document.getElementsByTagName('tr');
//             //переменная для строк фильтрованной таблицы
//             let filteredRows = [];
//
//             //удаляем строки заголовков таблиц, удаляем отмененные заказы, формируем одну таблицу из двух
//             for (i = 0; i < rows.length; i++) {
//                 if (rows[i].innerHTML.length !== 377) {
//                     if (rows[i].children[3].innerHTML.length > 100) {
//                         rows[i].parentNode.removeChild(rows[i]);
//                     } else {
//                         filteredRows.push(rows[i]);
//                     }
//                 }
//             }
//
//             //удаляем четвертую ячейку
//             for (i = 0; i < filteredRows.length; i++) {
//                 filteredRows[i].removeChild(filteredRows[i].children[3]);
//
//                 //добавляем ячейку со временем
//                 let timeItem = document.createElement('td');
//                 filteredRows[i].appendChild(timeItem);
//             }
//
//             //рендерим таблицу
//             const filteredTable = document.querySelector('.filtered-table');
//             for (i = 0; i < filteredRows.length; i++) {
//                 filteredTable.innerHTML += filteredRows[i].innerHTML;
//             }
//
//             //Проверяем наличие заказа в session storage, добавляем заказ если его нет, проверяем время наборки
//             for (i = 0; i < filteredTable.children.length; i++) {
//                 //console.log(filteredTable);
//                 //получаем номер заказа из таблицы
//                 let orderNumber = parseInt(filteredTable.children[i].children[0].children[0].children[0].children[0].innerHTML);
//
//                 //проверяем наличие заказа в session storage
//                 //---если заказа нет, добавляем в session storage его номер как ключ и unixtime как значение
//                 if (!isOrderNumberInSessionStorage(orderNumber)) {
//                     sessionStorage.setItem(orderNumber, parseInt(new Date().getTime() / 1000));
//                     // --- устанавливаем время в четвертый столбец
//                     filteredTable.children[i].children[0].children[3].innerHTML = '0:00';
//                 } else {
//                     //если заказ есть, обновляем время
//                     let seconds = parseInt(new Date().getTime() / 1000) - sessionStorage.getItem(orderNumber);
//                     filteredTable.children[i].children[0].children[3].innerHTML = unixTimeToNormal(seconds);
//
//                     //если пора отправлять сообщение, отправляем его в session storage
//                     if (seconds > timeToSendMessage) {
//                         if (!isAddedToSendString(orderNumber)) {
//                             if (doesSessionStorageContainsToSendString()) {
//                                 sessionStorage.setItem('to-send', sessionStorage.getItem('to-send') + '|' + orderNumber);
//                             } else {
//                                 sessionStorage.setItem('to-send', orderNumber);
//                             }
//                         }
//                     }
//
//                     //если заказ просрочен, отправляем его в session storage
//                     if (seconds > timeToExpire) {
//                         if (!isAdded(orderNumber)) {
//                             if (doesSessionStorageContainsExpiredString()) {
//                                 sessionStorage.setItem('expired', sessionStorage.getItem('expired') + '|' + orderNumber);
//                             } else {
//                                 sessionStorage.setItem('expired', orderNumber);
//                             }
//                         }
//                     }
//                 }
//             }
//             //Формируем строку с просроченными заказами
//             if (doesSessionStorageContainsExpiredString()) {
//                 let text = sessionStorage.getItem('expired');
//                 text = text.split('|');
//                 let createdText = '';
//                 for (i = 0; i < text.length; i++) {
//                     createdText += ", " + text[i];
//                 }
//                 createdText = createdText.substr(2);
//                 expiredOrders.innerHTML = createdText;
//             }
// //Проверяем, отправлены ли сообщения по заказам
//             if (doesSessionStorageContainsToSendString()) {
//                 let ordersToSend = sessionStorage.getItem('to-send');
//                 let ordersToSendArray = ordersToSend.split('|');
//                 if (doesSessionStorageContainsSentString()) {
//                     let sentOrders = sessionStorage.getItem('sent');
//                     let sentOrdersArray = sentOrders.split('|');
//                     for (i = 0; i < ordersToSendArray.length; i++) {
//                         for (j = 0; j < sentOrdersArray.length; j++) {
//                             if (ordersToSendArray[i] == sentOrdersArray[j]) {
//                                 ordersToSendArray.splice(i, 1);
//                             }
//                         }
//                     }
//                 }
//                 if (ordersToSendArray) {
//                     ordersToTelegram = ordersToSendArray;
//                 }
//             }
//
//         })
//         .then(() => {
//             if (ordersToTelegram) {
//                 for (i = 0; i < ordersToTelegram.length; i++) {
//                     console.log('Заказ ' + ordersToTelegram[i] + ' в наборе уже ' + timeToSendMessage / 60 + ' минут');
//                     //sendMessage('Заказ ' + ordersToTelegram[i] + ' в наборе уже ' + timeToSendMessage/60 + ' минут');
//                     if (doesSessionStorageContainsSentString()) {
//                         sessionStorage.setItem('sent', sessionStorage.getItem('sent') + '|' + ordersToTelegram[i]);
//                     } else {
//                         sessionStorage.setItem('sent', ordersToTelegram[i]);
//                     }
//                 }
//             }
//         })
//          .then(() => {
//              window.setTimeout(() => document.location.reload(), 10000);
//          })
})
