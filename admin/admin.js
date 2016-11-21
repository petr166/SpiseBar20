window.onload = function() {
  getMenu();
  convertIntoInput();
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
  $('.container-fluid').append("<div class='row foodSection'></div>")
  $.each(jsonObj.data, function(index, category) {
    console.log(category);
    $('.foodSection').append("<div class='row' id='" + category.id + "'>" +
                                  "<center><h4 class='food-type'>" + category.name +
                                          "</h4></center></div>");

    $.each(category.items, function(index, value) {
      console.log(value);
      $('.foodSection').append("<div class='row food-item' id='" + value.id + "'>" +
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

//function to turn plain text into input field
function convertIntoInput () {
  $('body').on('dblclick', '.editable', function() {
    var str = $(this).attr('class');
    if (~str.indexOf("food-name")) {
      var textarea = $("<textarea class='col-md-6 textarea-name autoExpand' rows='1' data-min-rows='2'>");
    }

    if (~str.indexOf("food-price")) {
      var textarea = $("<textarea class='col-md-6 food-price autoExpand' rows='1' data-min-rows='2'>");
    }

    if (~str.indexOf("food-description")) {
      var textarea = $("<textarea class='col-md-6 textarea-description autoExpand' rows='2' data-min-rows='2'>");
    }
    textarea.val($(this).text());
    $(this).replaceWith(textarea);
    textarea.select();
  });
}

//function to resize the textarea to fit content
$(document)
    .on('focus.textarea', '.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.textarea', '.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0,
            rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });
