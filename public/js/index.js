$(function() {

  $(".img-w").each(function() {
    $(this).wrap("<div class='img-c'></div>")
    const imgSrc = $(this).find("img").attr("src");
    $(this).css('background-image', 'url(' + imgSrc + ')');
  })

  firebase.performance();
})