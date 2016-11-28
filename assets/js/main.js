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
  var aboutSectionPos = $('#about_section').offset().top;
  if ($(window).scrollTop() > aboutSectionPos-50) {
    $('#navibar').addClass('strong');
    $('#my_nav_brand').addClass('displayed');
  } else {
    $('#navibar').removeClass('strong');
    $('#my_nav_brand').removeClass('displayed');
  }
}

$(document).ready(function(){
    $("#food_button").click(function(){
         $("#cocktail_section").hide();
         $("#wine_section").hide();
         $("#food_section").slideDown("slow");

    });
    $("#wine_button").click(function(){
        $("#cocktail_section").hide();
        $("#food_section").hide();
        $("#wine_section").slideDown("slow");
    });
    $("#cocktail_button").click(function(){
        $("#wine_section").hide();
        $("#food_section").hide();
        $("#cocktail_section").slideDown("slow");
    });
    $("#cocktail_arrow").click(
        function(){
        setTimeout(function(){$("#cocktail_section").hide();}, 1500);
    });
     $("#food_arrow").click(
        function(){
        setTimeout(function(){$("#food_section").hide();}, 1500);
    });
     $("#wine_arrow").click(
        function(){
        setTimeout(function(){$("#wine_section").hide();}, 1500);
    });
});

//function to retrieve the menu from data.json
function getMenu() {
  $.ajax({
    'url' : 'admin/menuAPI.php',
    'type' : 'GET',
    'success' : function(dataIN) {
      var jsonObj = JSON.parse(dataIN);
      displayMenu(jsonObj);
    }
  });
}

//function to display the menu from the jsonObj
function displayMenu(jsonObj) {
  $.each(jsonObj.data, function(index, category) {
    $('.menu').append("<div class='row'>" +
                                  "<center><h4 class='food-type'>" + category.name +
                                          "</h4></center></div>");

    $.each(category.items, function(index, value) {
      $('.menu').append("<div class='row food-item'>" +
                                    "<div class='row'>" +
                                      "<h4 class='col-md-6 food-name'>" + value.title + "</h4>" +
                                      "<span class='col-md-6 food-price'>" + value.price + " kr</span>" +
                                    "</div>" +
                                    "<div class='row'>" +
                                      "<p class='col-md-6 food-description'>" + value.description + "</p>" +
                                    "</div>" +
                                  "</div>");
    });
  });
}
