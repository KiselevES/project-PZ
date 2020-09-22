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
        const messageBox = document.querySelector('.options__message-box-time-to-expire');
        messageBox.style.display = 'block';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 1000)
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
        const messageBox = document.querySelector('.options__message-box-time-to-send-message');
        messageBox.style.display = 'block';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 1000)
    }
})

document.querySelector('.options__request-interval-button').addEventListener('click', (e) => {
    e.preventDefault();
    const requestTextArea = document.querySelector('.options__request-interval');
    if (requestTextArea.value && parseInt(requestTextArea.value) >= 10) {
        const mainObject = getMainObject();
        mainObject.requestInterval = parseInt(requestTextArea.value);
        requestTextArea.placeholder = requestTextArea.value;
        requestTextArea.value = '';
        setMainObject(mainObject);
    } else {
        const messageBox = document.querySelector('.options__message-box-request-interval');
        messageBox.style.display = 'block';
        requestTextArea.value = '';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 1000)
    }
})

document.querySelector('.reset').addEventListener('click', (e)=>{
    const msg = prompt('Действительно? Все данные удалятся! Для продолжения введите "УДАЛИТЬ!" большими буквами');
    if(msg ==='УДАЛИТЬ!'){
        localStorage.clear();
        window.location.reload();
    }
})