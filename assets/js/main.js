window.onload = function() {
  showContent();
  smoothScroll();
  loadImages();
};

//fade in the home page
function showContent() {
  $('#page_container').removeClass('fade-out'); //fade-in the body
  setTimeout(function() {$('#main_title').removeClass('fade-out');}, 500); //fade-in the title(slow)
}

//add smooth scroll effect when jumping to sections
function smoothScroll() {
  var $root = $('html, body');
  $('a.scrolly').bind('click', function(event) {
      var $anchor = $(this);
      $root.stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
  });
}

function loadImages() {
  var folder = "img/carousel/";
  var j = 1;
  $.ajax({
    url : folder,
    success: function (data) {
      $(data).find("a").attr("href", function (i, val) {
        if( val.match(/\.(jpe?g|png|gif)$/) ) {
          $("<div class='item'><img src='"+ folder + val +"'></div>").appendTo('.carousel-inner');
          $('<li data-target="#carousel" data-slide-to="'+ j +'"></li>').appendTo('.carousel-indicators');
          j++;
        }
      });
    }
  });
  $('.item').first().addClass('active');
  $('.carousel-indicators > li').first().addClass('active');
  $('#carousel').carousel();
}
