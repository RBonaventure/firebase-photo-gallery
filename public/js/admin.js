
function addEventHandler(obj, evt, handler) {
  if(obj.addEventListener) {
      // W3C method
      obj.addEventListener(evt, handler, false);
  } else if(obj.attachEvent) {
      // IE method.
      obj.attachEvent('on'+evt, handler);
  } else {
      // Old school method.
      obj['on'+evt] = handler;
  }
}

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

  $("#create-content-dialog").on("drag dragstart dragend dragover dragenter dragleave drop", function(event) {
      event.preventDefault();
      event.stopPropagation();
  }).on("dragover", function(event) {
      $(this).addClass('dragging');
  }).on("dragleave", function(event) {
      $(this).removeClass('dragging');
  }).on('drop', function (event) {
    $(this).removeClass('dragging');
    var files = event.originalEvent.dataTransfer.files;
    
    for (var i = 0 ; i < files.length ; i++) {
      var file = files[i];
      console.log(file); // TODO
    }
    
  });

  refresh();
});
/*
if(window.FileReader) { 

  addEventHandler(window, 'load', function() {
    var drop = document.getElementById('content');
    
    function cancel(e) {
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    }
  
    // Tells the browser that we *can* drop on this target
    addEventHandler(drop, 'dragover', cancel);
    addEventHandler(drop, 'dragenter', cancel); 
    addEventHandler(drop, 'drop', function (e) {
      e = e || window.event; // get window.event if e argument missing (in IE)   
      if (e.preventDefault) { e.preventDefault(); } // stops the browser from redirecting off to the image.

      var dt    = e.dataTransfer;
      var files = dt.files;
      for (var i=0; i<files.length; i++) {
        var file = files[i];
        console.log(file);
        var reader = new FileReader();
          
        //attach event handlers here...
      
        reader.readAsDataURL(file);
      }
      return false;
    });
  });
} else { 
  console.log('Your browser does not support the HTML5 FileReader.');
}
*/
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
    refreshBackup();
  }).catch(errorHandler);

}
