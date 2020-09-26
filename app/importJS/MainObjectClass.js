class mainObjectClass {
    constructor() {
        //интервал запросов
        this.requestInterval = 15;

        //время отправки сообщения (переаодим в сек)
        this.messageTime = 23 * 60;

        //время до просрочки (переводим в сек)
        this.expirationTime = 30 * 60;

        //пустой массив под заказы
        this.orders = [];

        //отправка сообщений в Telegram
        this.telegram = true;

        //развернуть инструкцию
        this.instruction = false;
    }
}