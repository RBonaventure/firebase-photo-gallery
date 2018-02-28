$(function() {

  const snackbar = document.querySelector('#snackbar');
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#user").html(user.email);
    } else {
      window.location.href = "login";
    }
  });

  $("#update-title").click(function() {
    const title = $("#title").val();
    let handler = function(event) {
      console.log("undo");
    };
    firebase.database().ref("/").update({title: title}).then(result => {
      showSnackbar('Le titre a été mis à jour ave succès.', handler)
    }).catch(errorHandler);
    
  });

  $("#update-description").click(function() {
    const description = $("#description").val();
    firebase.database().ref("/").update({description: description}).then(result => {
      showSnackbar('La description a été mise à jour ave succès.')
    }).catch(errorHandler);
  });

  $("#update-ga").click(function() {
    const ga = $("#ga").val();
    firebase.database().ref("/").update({ga_id: ga}).then(result => {
      showSnackbar("L'ID Google Analytics a été mis à jour ave succès.")
    }).catch(errorHandler);
  });

  $("#update-credit").click(function() {
    const credit = $("#credit").val();
    firebase.database().ref("/").update({credit: credit}).then(result => {
      showSnackbar('Les crédits ont été mis à jour ave succès.')
    }).catch(errorHandler);
  });

  $("#update-insta").click(function() {
    const instagram = $("#instagram").val();
    firebase.database().ref("/socialmedia").update({instagram: instagram}).then(result => {
      showSnackbar('Le lien Instagram a été mis à jour ave succès.')
    }).catch(errorHandler);
  });

  $("#update-fb").click(function() {
    const facebook = $("#facebook").val();
    firebase.database().ref("/socialmedia").update({facebook: facebook}).then(result => {
      showSnackbar('Le lien Facebook a été mis à jour ave succès.')
    }).catch(errorHandler);
  });

  $("#logout").click(function() {
    firebase.auth().signOut();
  });

  $("#refresh").click(function() {
    refresh();
  });

  refresh();
  getBackups();
})

let showSnackbar = (message, handler) => {
  var data = {
    message: message,
    timeout: 3000,
    actionHandler: handler,
    actionText: 'Annuler'
  };
    snackbar.MaterialSnackbar.showSnackbar(data);
};

let errorHandler = (error) => {
  showSnackbar('Une erreur est survenue, veuillez réessayer.');
};

let getBackups = () => {
  firebase.database().ref("/cms/backups").once('value').then(data => {
    
  });
}

let refresh = () => {
  
  firebase.database().ref("/").once('value').then(data => {
    const site = data.val();
    $("#title").val(site.title);
    $("#description").val(site.description);
    $("#ga").val(site.ga_id);
    $("#facebook").val(site.socialmedia.facebook);
    $("#instagram").val(site.socialmedia.instagram);
    $("#credit").val(site.credit);

    const list = $("#image-list");
    list.empty();
    $.each(site.posts, function(i)
    {
      const post = site.posts[i];
      var li = $('<div/>')
        .addClass('mdl-list__item mdl-list__item--two-line')
        .appendTo(list);
      var span = $('<span/>')
        .addClass('mdl-list__item-primary-content')
        .appendTo(li);
      var img = $('<img/>')
        .attr('src', post.src)
        .addClass('mdl-list__item-avatar')
        .attr('width', "128px")
        .attr('height', "128px")
        .appendTo(span);
      var href = $('<span/>')
        .addClass('mdl-list__item-secondary-content')
        .html(`<a href="${post.href}"> ${post.href} </a>`)
        .appendTo(span);
      var text = $('<span/>')
        .html(post.text)
        .appendTo(span);
    });
    
  }).catch(errorHandler);

}