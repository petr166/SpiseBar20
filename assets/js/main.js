$(function() {
  showContent();
  smoothScroll();
});

//fade in the home page
function showContent() {
  $('body').removeClass('fade-out'); //fade-in the body
  $('#main_title').fadeIn(2500); //fade-in the title(slow)
}

//add smooth scroll effect when jumping to sections
function smoothScroll() {
  var $root = $('html, body');
  $('a').click(function(){
    $root.animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
  });
}
