$("#update-insta").click(function() {
    const instagram = $("#instagram").val();
    firebase.database().ref("/socialmedia").update({instagram: instagram}).then(result => {
        showSnackbar('Le lien Instagram a été mis à jour ave succès.');
    }).catch(errorHandler);
});

$("#update-fb").click(function() {
    const facebook = $("#facebook").val();
    firebase.database().ref("/socialmedia").update({facebook: facebook}).then(result => {
        showSnackbar('Le lien Facebook a été mis à jour ave succès.');
    }).catch(errorHandler);
});

$("#instagram-open").click(function() {
    const instagram = $("#instagram").val();
    window.open(instagram, '_blank');
});

$("#facebook-open").click(function() {
    const facebook = $("#facebook").val();
    window.open(facebook, '_blank');
});