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
    
    const list = $("#contents-list");
    list.empty();
    $.each(site.posts, function(i)
    {
      // Reverse posts order
      const index = site.posts.length - (i+1);
      const post = site.posts[index];
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