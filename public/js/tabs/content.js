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

$('#image-selector').change(function() {
    var file = $('#image-selector')[0].files[0];
    console.log(file);
});

$("#create").click(function() {
    const instagram = $("#instagram-url").val();
    const facebook = $("#facebook-url").val();
    const text = $("#content-text").val();
    const image = $("#image-selector")[0].files[0];

    if(!text || !image) {
        showSnackbar('Veuillez remplir le champs manquants.');
        return;
    }

    let content = {
        text: text,
        social: {
            instagram: instagram,
            facebook: facebook
        }
    };

    const now = new Date();
    const filename = `${now.getTime()}-${image.name}`;

    const imageRef = firebase.storage().ref("images").child(filename);
    const uploadTask = imageRef.put(image);

    uploadTask.on('state_changed', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
    });
    
    uploadTask.then(function(snapshot) {
        console.log(snapshot);
        content.src = snapshot.downloadURL;
        firebase.database().ref("/posts").child(new Date().getTime()).set(content).then(() => {
            $("#instagram-url").val("");
            $("#facebook-url").val("");
            $("#content-text").val("");
            $("#image-selector").val("");
            dialog.close();
        }).catch(errorHandler);
    }).catch(errorHandler);
});

refreshContent = () => {
    firebase.database().ref("/posts").on('value', (snapshot) => {
    
        const posts = snapshot.val();
        const list = $("#contents-list");
        list.empty();
        
        for(const key of Object.keys(posts).reverse()) {
            const post = posts[key];

            var li = $('<div/>')
              .addClass('mdl-list__item mdl-list__item--two-line')
              .css('height', "auto")
              .appendTo(list);
            var span = $('<span/>')
              .addClass('mdl-list__item-primary-content')
              .appendTo(li);
            var img = $('<img/>')
              .attr('src', post.src)
              .addClass('mdl-list__item-avatar')
              .appendTo(span);
            var href = $('<span/>')
              .addClass('mdl-list__item-secondary-content')
              .html(`<a href="${post.href}"> ${post.href} </a>`)
              .appendTo(span);
            var text = $('<span/>')
              .html(post.text)
              .appendTo(span);
        };
    });
    
}