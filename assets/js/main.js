window.onload = function() {
  showContent();
  smoothScroll();
  strongNaviBar();
  setNaviBar();
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

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    $('#page_container').addClass("blured");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    $('#page_container').removeClass("blured");
}

/* Set the navibar to be solid on scroll */
function setNaviBar() {
  $(window).scroll(strongNaviBar);
}

function strongNaviBar() {
  var aboutSectionPos = $('#aboutSection').offset().top;
  if ($(window).scrollTop() > aboutSectionPos-50) {
    $('#navibar').addClass('strong');
    $('#my_nav_brand').addClass('displayed');
  } else {
    $('#navibar').removeClass('strong');
    $('#my_nav_brand').removeClass('displayed');
  }
}
