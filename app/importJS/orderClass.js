class orderClass {
    constructor(orderNumber) {
        this.unixTime = parseInt(new Date().getTime() / 1000);
        this.date = parseInt(new Date().getDate());
        this.expired = false;
        this.messageSent = false;
        this.complete = false;
        this.completeTime = 0;
        this.inQueue = false;
        this.preparing = false;
        this.orderNumber = orderNumber;
        this.remade = false;
    }

    setExpired() {
        this.expired = true;
    }

    setMessageSent() {
        this.messageSent = true;
    }

    setTime(time) {
        this.completeTime = time - this.unixTime;
    }

    setQueue() {
        this.inQueue = true;
        this.preparing = false;
    }

    setPreparing() {
        this.preparing = true;
        this.inQueue = false;
    }

    setComplete() {
        this.complete = true;
        this.preparing = false;
        this.inQueue = false;
    }

    setRemade(){
        this.Complete = false;
        this.Remade = true;
    }

}
