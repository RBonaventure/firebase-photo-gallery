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
    firebase.database().ref("/analytics").update({ga_id: ga}).then(result => {
      showSnackbar("L'ID Google Analytics a été mis à jour ave succès.")
    }).catch(errorHandler);
  });

  $("#update-analytics-clientid").click(function() {
    const token = $("#token").val();
    firebase.database().ref("/analytics").update({ga_token: token}).then(result => {
      showSnackbar("Le Client ID Google Analytics API a été mis à jour ave succès.")
    }).catch(errorHandler);
  });

  $("#update-credit").click(function() {
    const credit = $("#credit").val();
    firebase.database().ref("/").update({credit: credit}).then(result => {
      showSnackbar('Les crédits ont été mis à jour ave succès.')
    }).catch(errorHandler);
  });

  $("#instagram-open").click(function() {
    const instagram = $("#instagram").val();
    window.open(instagram, '_blank');
  });

  $("#update-insta").click(function() {
    const instagram = $("#instagram").val();
    firebase.database().ref("/socialmedia").update({instagram: instagram}).then(result => {
      showSnackbar('Le lien Instagram a été mis à jour ave succès.')
    }).catch(errorHandler);
  });

  $("#facebook-open").click(function() {
    const facebook = $("#facebook").val();
    window.open(facebook, '_blank');
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

  $("#open").click(function() {
    window.location.href = "/";
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

let enableAnalyticsChart = (token) => {

  gapi.analytics.ready(function() {

    /**
     * Authorize the user immediately if the user has already granted access.
     * If no access has been created, render an authorize button inside the
     * element with the ID "embed-api-auth-container".
     */
    gapi.analytics.auth.authorize({
      container: 'embed-api-auth-container',
      clientid: token
    });
  
    /**
     * Create a new ViewSelector instance to be rendered inside of an
     * element with the id "view-selector-container".
     */
    var viewSelector = new gapi.analytics.ViewSelector({
      container: 'view-selector-container'
    });
  
    // Render the view selector to the page.
    viewSelector.execute();
  
    /**
     * Create a new DataChart instance with the given query parameters
     * and Google chart options. It will be rendered inside an element
     * with the id "chart-container".
     */
    var dataChart = new gapi.analytics.googleCharts.DataChart({
      query: {
        metrics: 'ga:sessions',
        dimensions: 'ga:date',
        'start-date': '30daysAgo',
        'end-date': 'yesterday'
      },
      chart: {
        container: 'chart-container',
        type: 'LINE',
        options: {
          width: '100%'
        }
      }
    });
  
    /**
     * Render the dataChart on the page whenever a new view is selected.
     */
    viewSelector.on('change', function(ids) {
      dataChart.set({query: {ids: ids}}).execute();
    });
  
  });
};

let refresh = () => {
  
  firebase.database().ref("/").once('value').then(data => {
    const site = data.val();
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