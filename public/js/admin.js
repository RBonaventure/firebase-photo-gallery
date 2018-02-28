$(function() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#user").html(user.email);
    } else {
      window.location.href = "login";
    }
  });
  
  $("#logout").click(function() {
    firebase.auth().signOut();
  });

})