class mainObjectClass {
    constructor() {
        //интервал запросов
        this.requestInterval = 10;

        //время отправки сообщения (переаодим в сек)
        this.messageTime = 23 * 60;

        //время до просрочки (переводим в сек)
        this.expirationTime = 30 * 60;

        //пустой массив под заказы
        this.orders = [];
    }
}