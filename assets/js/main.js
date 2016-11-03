$(function() {
  showContent();
  smoothScroll();
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
