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
    firebase.database().ref("/").update({description: description}).catch(errorHandler);
  });

  $("#update-ga").click(function() {
    const ga = $("#ga").val();
    firebase.database().ref("/").update({ga_id: ga}).catch(errorHandler);
  });

  $("#update-credit").click(function() {
    const credit = $("#credit").val();
    firebase.database().ref("/").update({credit: credit}).catch(errorHandler);
  });

  $("#update-insta").click(function() {
    const instagram = $("#instagram").val();
    firebase.database().ref("/socialmedia").update({instagram: instagram}).catch(errorHandler);
  });

  $("#update-fb").click(function() {
    const facebook = $("#facebook").val();
    firebase.database().ref("/socialmedia").update({facebook: facebook}).catch(errorHandler);
  });

  $("#logout").click(function() {
    firebase.auth().signOut();
  });

  $("#refresh").click(function() {
    refresh();
  });

  refresh();
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

let refresh = () => {

  firebase.database().ref("/").once('value').then(data => {
    const site = data.val();
    $("#title").val(site.title);
    $("#description").val(site.description);
    $("#ga").val(site.ga_id);
    $("#facebook").val(site.socialmedia.facebook);
    $("#instagram").val(site.socialmedia.instagram);
    $("#credit").val(site.credit);
  }).catch(errorHandler);

}