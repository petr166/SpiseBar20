window.onload = function() {
  getMenu();
};


//function to retrieve the menu from data.json
function getMenu() {
  $.ajax({
    'url' : 'menuAPI.php',
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
    $('.container-fluid').append("<div class='row editable' id='" + category.id + "'>" +
                                  "<center><h4 class='food-type'>" + category.name +
                                          "</h4></center></div>");

    $.each(category.items, function(index, value) {
      console.log(value);
      $('.container-fluid').append("<div class='row food-item' id='" + value.id + "'>" +
                                    "<div class='row'>" +
                                      "<h4 class='col-md-6 food-name editable'>" + value.title + "</h4>" +
                                      "<span class='col-md-6 food-price editable'>" + value.price + "</span>" +
                                    "</div>" +
                                    "<div class='row'>" +
                                      "<p class='col-md-6 food-description editable'>" + value.description + "</p>" +
                                    "</div>" +
                                  "</div>");
    });
  });
}
