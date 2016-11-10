$(function() {
  showContent();
  smoothScroll();
  loadImages();
});

//fade in the home page
function showContent() {
  $('body').removeClass('fade-out'); //fade-in the body
  $('#main_title').fadeIn(3000); //fade-in the title(slow)
}

//add smooth scroll effect when jumping to sections
function smoothScroll() {
  var $root = $('html, body');
  $('.scrolly').click(function(){
    $root.animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 800);
    return false;
  });
}

function loadImages() {
  var folder = "img/carousel/";
  $.ajax({
    url : folder,
    success: function (data) {
      $(data).find("a").attr("href", function (i, val) {
        if( val.match(/\.(jpe?g|png|gif)$/) ) {
          $("<div class='item'><img src='"+ folder + val +"'></div>").appendTo('.carousel-inner');
          $('<li data-target="#carousel" data-slide-to="'+ 0 +'"></li>').appendTo('.carousel-indicators')
        }
      });
    }
  });
  $('.item').first().addClass('active');
  $('.carousel-indicators > li').first().addClass('active');
  $('#carousel').carousel();
}
