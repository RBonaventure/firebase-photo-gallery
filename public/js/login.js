$(function() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.href = "admin";
    }
  });

  $("#email").val(localStorage.getItem("email"));
  $("#password").val(localStorage.getItem("password"));
  $("#remember").prop("checked", localStorage.getItem("remember") == "true" ? true : false);
    
  $("form").submit(function(event) {
    event.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    login(email, password);

    if($("#remember").prop("checked")) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("remember", true);
    } else {
      localStorage.setItem("email", "");
      localStorage.setItem("password", "");
      localStorage.setItem("remember", false);
    }
    
  });
  
})

let login = (email, password) => {
  $('#error').hide();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(function(error) {
    
    switch(error.code) {
      case "auth/user-not-found":
        $('#error').html("Cet utilisateur n'existe pas.");
        break;
      case "auth/wrong-password":
        $('#error').html("Le mot de passe est incorrect.");
        break;
      case "auth/invalid-email":
        $('#error').html("L'adresse email est incorrecte.");
        break;
      default:
        $('#error').html("Une erreur est survenue, veuillez réessayer.");
    }

    $('#error').show();
  });
}
