const controller = {
    mainRoute() {
        let interval = 10;
        if (isMainObjectExists()) {
            const mainObject = getMainObject();
            interval = mainObject.requestInterval;
        }

        model.callExternalContent()
            .then((response) => {
                model.getContent(response);
                model.setWarning();
                view.sendMessages();
                view.drawTable();
                view.setTimer();
                view.telegramCheckbox();
                view.setPlaceholders();


                document.getElementById('interval').scrollIntoView();
            })

        window.setTimeout(() => {
            //this.mainRoute();
            window.location.reload();
        }, interval * 1000);
    }
}