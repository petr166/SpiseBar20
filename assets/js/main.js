window.onload = function() {
  showContent();
  smoothScroll();
  loadImages();
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
/*var cocktailSection = $('#cocktailSection');
var cocktailButton = $('#foodButton');
function foodSection(){
    console.log("esti un prost");
    $('#cocktailSection').css('display','block');
    cocktailSection.style.display = "block";
    
}*/
$(document).ready(function(){
    $("#foodButton").click(function(){ 
         $("#cocktailSection").hide();
         $("#wineSection").hide();
         $(".foodSection").slideDown("slow");
        
    }); 
    $("#wineButton").click(function(){
        $("#cocktailSection").hide();
        $(".foodSection").hide();
        $("#wineSection").slideDown("slow");
    }); 
    $("#cocktailButton").click(function(){
        $("#wineSection").hide();
        $(".foodSection").hide();
        $("#cocktailSection").slideDown("slow");
    });
    $("#cocktail-arrow").click(
        function(){
        setTimeout(function(){$("#cocktailSection").hide();}, 1500);
       
        
        
    });
     $("#food-arrow").click(
        function(){
       
       
        setTimeout(function(){$(".foodSection").hide();}, 1500);
        
        
    });
     $("#wine-arrow").click(
        function(){
       
        setTimeout(function(){$(".foodSection").hide();}, 1500);
        
        
    });
  /*  $(".up-arrow").click(function(){
       $("#cocktailSection").slideUp("slow", function(){$(this).hide();}); 
        $(".foodSection").slideUp("slow", function(){
            $(this).hide();
             
        }); 
          $("#wineSection").slideUp("slow", function(){$(this).hide();}); 
    }); */
    
    
});