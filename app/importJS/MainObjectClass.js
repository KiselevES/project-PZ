class mainObjectClass {
    constructor() {
        //интервал запросов
        this.requestInterval = 10 * 1000;

        //время отправки сообщения (переаодим в сек)
        this.messageTime = 23 * 60;

        //время до просрочки (переводим в сек)
        this.expirationTime = 30 * 60;

        //дата
        const currentDate = new Date();
        this.currentDate = currentDate.getDate();

        //пустой массив под заказы
        this.orders = [];
    }
}