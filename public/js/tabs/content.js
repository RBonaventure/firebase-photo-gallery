const dialog = $("#create-content-dialog").get("0");
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

$("#close").click(function() {
    dialog.close();
});

$("#create-content").click(function() {
    dialog.showModal();
});

$("#create").click(function() {
    const instagram = $("#instagram-url").val();
    const facebook = $("#facebook-url").val();
    const image = $("#image").val();

    console.log(instagram);
    console.log(facebook);
    console.log(image);
});