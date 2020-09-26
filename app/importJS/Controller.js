const controller = {
    mainRoute() {
        let interval = 15;
        if (isMainObjectExists()) {
            const mainObject = getMainObject();
            interval = mainObject.requestInterval;
        }

        model.callExternalContent()
            .then((response) => {
                model.getContent(response);
                model.setWarning();
                view.instruction();
                view.sendMessages();
                view.drawTable();
                view.setTimer();
                view.telegramCheckbox();
                view.setPlaceholders();
                document.getElementById('interval').scrollIntoView();
            }, () => {
                setTimeout(()=>{
                    window.location.reload();
                },10000)
            })

        window.setTimeout(() => {
            this.mainRoute();
            //window.location.reload();
        }, interval * 1000);
    }
}