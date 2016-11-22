window.onload = function() {
  showContent();
  smoothScroll();
  strongNaviBar();
  setNaviBar();
  getMenu();
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
        setTimeout(function(){$("#wineSection").hide();}, 1500);
    });
});

//function to retrieve the menu from data.json
function getMenu() {
  $.ajax({
    'url' : 'admin/menuAPI.php',
    'type' : 'GET',

    'success' : function(dataIN) {
      var jsonObj = JSON.parse(dataIN);
      console.log(jsonObj.data);
      displayMenu(jsonObj);
    }
  });
}

//function to display the menu from the jsonObj
function displayMenu(jsonObj) {
  $.each(jsonObj.data, function(index, category) {
    console.log(category);
    $('.menu').append("<div class='row'>" +
                                  "<center><h4 class='food-type'>" + category.name +
                                          "</h4></center></div>");

    $.each(category.items, function(index, value) {
      console.log(value);
      $('.menu').append("<div class='row food-item'>" +
                                    "<div class='row'>" +
                                      "<h4 class='col-md-6 food-name'>" + value.title + "</h4>" +
                                      "<span class='col-md-6 food-price'>" + value.price + "</span>" +
                                    "</div>" +
                                    "<div class='row'>" +
                                      "<p class='col-md-6 food-description'>" + value.description + "</p>" +
                                    "</div>" +
                                  "</div>");
    });
  });
}
