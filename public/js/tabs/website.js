$("#update-title").click(function() {
    const title = $("#title").val();
    let handler = function(event) {
        console.log("undo");
    };
    firebase.database().ref("/").update({title: title}).then(result => {
        showSnackbar('Le titre a été mis à jour avec succès.', handler)
    }).catch(errorHandler);
});

$("#update-url").click(function() {
    const url = $("#url").val();
    firebase.database().ref("/").update({url: url}).then(result => {
        showSnackbar("L'URL du site web a été mise à jour avec succès.");
    }).catch(errorHandler);
});

$("#update-theme").click(function() {
    const fullwidth_video_theme = $("#theme-full-width-video")[0].checked;
    const theme = fullwidth_video_theme ? 'fullwidth_video' : 'default';
    console.log(theme);
    firebase.database().ref("/").update({type: theme}).then(result => {
        showSnackbar("Le thème du site web a été mise à jour avec succès.");
    }).catch(errorHandler);
});

$("#update-description").click(function() {
    const description = $("#description").val();
    firebase.database().ref("/").update({description: description}).then(result => {
        showSnackbar('La description a été mise à jour avec succès.');
    }).catch(errorHandler);
});

$("#update-credit").click(function() {
    const credit = $("#credit").val();
    firebase.database().ref("/").update({credit: credit}).then(result => {
        showSnackbar('Les crédits ont été mis à jour avec succès.');
    }).catch(errorHandler);
});