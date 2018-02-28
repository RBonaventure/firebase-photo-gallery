$(function() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#user").html(user.email);
    } else {
      window.location.href = "login";
    }
  });
  
  $("#update-title").click(function() {
    const title = $("#title").val();
    firebase.database().ref("/").update({title: title});
  });

  $("#update-description").click(function() {
    const description = $("#description").val();
    firebase.database().ref("/").update({description: description});
  });

  $("#update-ga").click(function() {
    const ga = $("#ga").val();
    firebase.database().ref("/").update({ga_id: ga});
  });

  $("#update-credit").click(function() {
    const credit = $("#credit").val();
    firebase.database().ref("/").update({credit: credit});
  });

  $("#update-insta").click(function() {
    const instagram = $("#instagram").val();
    firebase.database().ref("/socialmedia").update({instagram: instagram});
  });

  $("#update-fb").click(function() {
    const facebook = $("#facebook").val();
    firebase.database().ref("/socialmedia").update({facebook: facebook});
  });

  $("#logout").click(function() {
    firebase.auth().signOut();
  });

  $("#refresh").click(function() {
    refresh();
  });

  refresh();
})

let refresh = function() {

  firebase.database().ref("/").once('value').then(data => {
    const site = data.val();
    $("#title").val(site.title);
    $("#description").val(site.description);
    $("#ga").val(site.ga_id);
    $("#facebook").val(site.socialmedia.facebook);
    $("#instagram").val(site.socialmedia.instagram);
    $("#credit").val(site.credit);
  });

}