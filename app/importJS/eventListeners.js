//устанавливаем интервал, время сообщения, время до просрочки
document.querySelector('.options__time-to-expire-button').addEventListener('click', (e) => {
    e.preventDefault();
    const expireTextArea = document.querySelector('.options__time-to-expire');
    if (expireTextArea.value) {
        const mainObject = getMainObject();
        mainObject.expirationTime = parseInt(expireTextArea.value) * 60;
        setMainObject(mainObject);
        expireTextArea.placeholder = expireTextArea.value;
        expireTextArea.value = '';
    } else {
        //TODO: Дописать вывод на экран сообщения о том, что значение не введено
    }
})

document.querySelector('.options__time-to-send-message-button').addEventListener('click', (e) => {
    e.preventDefault();
    const messageTextArea = document.querySelector('.options__time-to-send-message');
    if (messageTextArea.value) {
        const mainObject = getMainObject();
        mainObject.messageTime = parseInt(messageTextArea.value) * 60;
        messageTextArea.placeholder = messageTextArea.value;
        messageTextArea.value = '';
        setMainObject(mainObject);
    } else {
        //TODO: дописать вывод на экран о том, что значение не введено
    }
})

document.querySelector('.options__request-interval-button').addEventListener('click', (e) => {
    e.preventDefault();
    const requestTextArea = document.querySelector('.options__request-interval');
    if (requestTextArea.value && parseInt(requestTextArea.value) > 10) {
        const mainObject = getMainObject();
        mainObject.requestInterval = parseInt(requestTextArea.value) * 1000;
        requestTextArea.placeholder = requestTextArea.value;
        requestTextArea.value = '';
        setMainObject(mainObject);
    } else {
        //TODO: дописать вывод на экран о том, что значение не введено или меньше 10 сек
    }
})