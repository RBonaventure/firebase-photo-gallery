const snackbar = $('#snackbar').get("0");

let showSnackbar = (message, handler) => {
    var data = {
        message: message,
        timeout: 3000,
        actionHandler: handler,
        actionText: 'Annuler'
    };
    snackbar.MaterialSnackbar.showSnackbar(data);
};