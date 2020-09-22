document.addEventListener("DOMContentLoaded", () => {
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
        })

    window.setInterval(() => {
        model.callExternalContent()
            .then((response) => {
                model.getContent(response);
                model.setWarning();
                view.sendMessages();
                view.drawTable();
                view.setPlaceholders();
            })
    }, interval * 1000);

})
