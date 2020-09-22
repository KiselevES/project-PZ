const controller = {
    mainRoute(){
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
                view.setPlaceholders();
                document.getElementById('interval').scrollIntoView();
            })

        window.setTimeout(() => {
            window.location.reload();
        }, interval * 1000);
    }
}