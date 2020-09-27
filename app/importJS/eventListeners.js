//устанавливаем интервал, время сообщения, время до просрочки
document.querySelector('.options__time-to-expire-button').addEventListener('click', (e) => {
    e.preventDefault();
    const expireTextArea = document.querySelector('.options__time-to-expire');
    if (expireTextArea.value && !isNaN(expireTextArea.value)) {
        const mainObject = getMainObject();
        mainObject.expirationTime = parseInt(expireTextArea.value) * 60;
        setMainObject(mainObject);
        expireTextArea.placeholder = expireTextArea.value;
        expireTextArea.value = '';
    } else {
        const messageBox = document.querySelector('.options__message-box-time-to-expire');
        messageBox.style.display = 'block';
        expireTextArea.value = '';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 1000)
    }
})

document.querySelector('.options__time-to-send-message-button').addEventListener('click', (e) => {
    e.preventDefault();
    const messageTextArea = document.querySelector('.options__time-to-send-message');
    if (messageTextArea.value && !isNaN(messageTextArea.value)) {
        const mainObject = getMainObject();
        mainObject.messageTime = parseInt(messageTextArea.value) * 60;
        messageTextArea.placeholder = messageTextArea.value;
        messageTextArea.value = '';
        setMainObject(mainObject);
    } else {
        const messageBox = document.querySelector('.options__message-box-time-to-send-message');
        messageBox.style.display = 'block';
        messageTextArea.value = '';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 1000)
    }
})

document.querySelector('.options__request-interval-button').addEventListener('click', (e) => {
    e.preventDefault();
    const requestTextArea = document.querySelector('.options__request-interval');
    if (requestTextArea.value && !isNaN(requestTextArea.value) && parseInt(requestTextArea.value) >= 10) {
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

document.querySelector('.reset').addEventListener('click', (e) => {
    e.preventDefault();
    const msg = prompt('Действительно? Все данные удалятся! Для продолжения введите "УДАЛИТЬ!" большими буквами');
    if (msg === 'УДАЛИТЬ!') {
        localStorage.clear();
        window.location.reload();
    }


})

document.addEventListener('scroll', () => {
    const header = document.querySelector('.new-table__header-white-bg');
    if (window.scrollY > header.getBoundingClientRect().top) {
        header.style.position = 'fixed';
        header.style.top = '0';
    } else {
        header.style.position = 'static';
    }
})

document.querySelector('.telegram__checkbox').addEventListener('change', () => {
    const mainObject = getMainObject();
    const checkBox = document.querySelector('.telegram__checkbox');
    mainObject.telegram = !!checkBox.checked;
    setMainObject(mainObject);
})

document.querySelector('.introduction__link').addEventListener('click', deployInstruction);