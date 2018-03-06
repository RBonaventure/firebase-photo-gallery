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

$('#link').change(function() {
    if($("#link").prop('checked')) {
        $("#url-container").show();
    } else {
        $("#url-container").hide();
    }
});

$('#link-type').change(function() {
    if($("#link-type").prop('checked')) {
        $("#link-type-label").html("Lien vers les réseaux sociaux");
        $("#instagram-container").show();
        $("#facebook-container").show();
        $("#direct-link-container").hide();
    } else {
        $("#link-type-label").html("Lien direct");
        $("#instagram-container").hide();
        $("#facebook-container").hide();
        $("#direct-link-container").show();
    }
});

$("#create").click(function() {
    const instagram = $("#instagram-url").val();
    const facebook = $("#facebook-url").val();
    const directLink = $("#direct-link-url").val();
    const text = $("#content-text").val();
    const image = $("#image-selector")[0].files[0];
    
    const hasLink = $("#link").prop('checked');
    const socialLink = $("#link-type").prop('checked');

    if(!text || !image || (hasLink && ((socialLink && (!instagram || !facebook)) || (!socialLink && !directLink))) ) {
        showSnackbar('Veuillez remplir le champs manquants.');
        return;
    }

    let content = {
        text: text
    };

    if(hasLink) {
        if(socialLink) {
            content.social = {
                instagram: instagram,
                facebook: facebook
            };
        } else {
            content.href = directLink;
        }
    }

    const now = new Date();
    const filename = `${now.getTime()}-${image.name}`;

    const imageRef = firebase.storage().ref("images").child(filename);
    const uploadTask = imageRef.put(image);

    uploadTask.on('state_changed', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
    });
    
    uploadTask.then(function(snapshot) {
        content.src = snapshot.downloadURL;
        firebase.database().ref("/posts").child(new Date().getTime()).set(content).then(() => {
            $("#instagram-url").val("");
            $("#facebook-url").val("");
            $("#content-text").val("");
            $("#image-selector").val("");
            $("#link").attr("checked", false);
            $("#link-type").attr("checked", true);
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