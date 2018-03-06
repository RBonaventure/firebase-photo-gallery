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

            var item = $('<div/>')
                .addClass('mdl-list__item')
                .appendTo(list);
            var primary = $('<span/>')
                .addClass('mdl-list__item-primary-content')
                .appendTo(item);
            var img = $('<img/>')
                .attr('src', post.src)
                .css('width', '64px')
                .css('height', '64px')
                .appendTo(primary);
            var text = $('<span/>')
                .css('height', '64px')
                .css('margin', '10px')
                .css('overlay', 'scroll')
                .html(post.text)
                .appendTo(primary);

            if(post.social) {

                if(!post.social.facebook.empty) {
                    var facebook = $('<i/>')
                        .addClass('fab')
                        .addClass('fa-facebook-square')
                        .addClass('mdl-list__item-secondary-action')
                        .css('width', '24px')
                        .css('height', '24px')
                        .appendTo(item);
                    facebook.click(function() {
                        window.open(post.social.facebook, '_blank');
                    });
                }
                
                if(!post.social.instagram.empty) {
                    var instagram = $('<i/>')
                        .addClass('fab')
                        .addClass('fa-instagram')
                        .addClass('material-icons')
                        .addClass('mdl-list__item-secondary-action')
                        .attr('id', 'insta')
                        .css('width', '24px')
                        .css('height', '24px')
                        .appendTo(item);
                    $("#insta").click(function() {
                        window.open(post.social.instagram, '_blank');
                    });
                }
                
            } else if (post.href && !post.href.empty) {

                var link = $('<i/>')
                    .addClass('material-icons')
                    .addClass('mdl-list__item-secondary-action')
                    .html('open_in_new')
                    .appendTo(item);
                link.click(function() {
                    window.open(post.href, '_blank');
                });
            }
            
            var edit = $('<i/>')
                .addClass('material-icons')
                .addClass('mdl-list__item-secondary-action')
                .html('mode_edit')
                .appendTo(item);
            edit.click(function() {
                editByID(key)
            });
            var remove = $('<i/>')
                .addClass('material-icons')
                .addClass('mdl-list__item-secondary-action')
                .html('delete')
                .appendTo(item);
            remove.click(function() {
                deletePostByID(key)
            });
        };
    });
}

deletePostByID = (id) => {
    firebase.database().ref(`/posts/${id}`).remove().then(function() {
        console.log(`${id} was deleted.`);
    }).catch(errorHandler);
}

editByID = (id) => {
    console.log("Edit post with id : " + id);
}