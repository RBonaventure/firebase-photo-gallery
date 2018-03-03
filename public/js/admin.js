$(function() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#user").html(user.email);
    } else {
      window.location.href = "login";
    }
  });

  $("#refresh").click(function() {
    refresh();
  });

  $("#open").click(function() {
    window.location.href = "/";
  });

  $("#logout").click(function() {
    firebase.auth().signOut();
  });

  refresh();
})

let refresh = () => {
  
  firebase.database().ref("/").once('value').then(data => {
    const site = data.val();
    $("#url").val(site.url);
    $("#title").val(site.title);
    $("#description").val(site.description);
    $("#ga").val(site.analytics.ga_id);
    $("#token").val(site.analytics.ga_token);
    $("#facebook").val(site.socialmedia.facebook);
    $("#instagram").val(site.socialmedia.instagram);
    $("#credit").val(site.credit);

    if(site.analytics.ga_token) {
      enableAnalyticsChart(site.analytics.ga_token);
    }
    
    refreshContent();
  }).catch(errorHandler);

}