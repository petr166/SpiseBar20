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
      displayMenu(jsonObj);
    }
  });
}

function updateJSON_name(itemID, attribute, value) {
    $.ajax({
    'url' : 'menuAPI.php',
    'type' : 'GET',

    'success' : function(dataIN) {
      var jsonObj = JSON.parse(dataIN);
      $.each(jsonObj.data, function(pos, category) {
          $.each(category.items, function(pos, item) {
            if(item.id == itemID) {
              item.title = value;
            }
          });
      });
      updateJSONRequest(jsonObj);
    }
  });
}

function updateJSON_description(itemID, attribute, value) {
    $.ajax({
    'url' : 'menuAPI.php',
    'type' : 'GET',

    'success' : function(dataIN) {
      var jsonObj = JSON.parse(dataIN);
      $.each(jsonObj.data, function(pos, category) {
          $.each(category.items, function(pos, item) {
            if(item.id == itemID) {
              item.description = value;
            }
          });
      });
      updateJSONRequest(jsonObj);
    }
  });
}

function updateJSON_price(itemID, attribute, value) {
    $.ajax({
    'url' : 'menuAPI.php',
    'type' : 'GET',

    'success' : function(dataIN) {
      var jsonObj = JSON.parse(dataIN);
      $.each(jsonObj.data, function(pos, category) {
          $.each(category.items, function(pos, item) {
            if(item.id == itemID) {
              item.price = value;
            }
          });
      });
      updateJSONRequest(jsonObj);
    }
  });
}

function updateJSONRequest(jsonObj) {
  $.ajax({
    'url' : 'menuAPI.php',
    'type' : 'POST',
    'data' : {
      'newData' : JSON.stringify(jsonObj.data)
    },

    'success' : function(dataIN) {
     var jsonObject = JSON.parse(dataIN);
    }
  });
}

//function to display the menu from the jsonObj
function displayMenu(jsonObj) {
  $('.container-fluid').append("<div class='row' id='food_section'></div>")
  $.each(jsonObj.data, function(index, category) {
    $('#food_section').append("<div class='row' id='" + category.id + "'>" +
                                  "<center><h4 class='food-type'>" + category.name +
                                          "</h4></center></div>");

    $.each(category.items, function(index, value) {
      $('#food_section').append("<div class='row food-item' id='" + value.id + "'>" +
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
         textarea.blur(onBlurName);
    }

    if (~str.indexOf("food-price")) {
      var textarea = $("<textarea class='col-md-6 food-price autoExpand' rows='1' data-min-rows='2'>");
        textarea.blur(onBlurPrice);
    }

    if (~str.indexOf("food-description")) {
      var textarea = $("<textarea class='col-md-6 textarea-description autoExpand' rows='2' data-min-rows='2'>");
        textarea.blur(onBlurDescription);
    }
    textarea.val($(this).text());
    $(this).replaceWith(textarea);
    textarea.select();

  });
}

function onBlurName(){
        var html = $(this).val();
        var viewableText = $("<h4 class='col-md-6 food-name editable'>");
        if(!html) {
          viewableText.html("Insert title");
        }
        else {
          viewableText.html(html);
        }
        $(this).replaceWith(viewableText);
        updateJSON_name(viewableText.parent().parent().attr('id'), 'title', viewableText.html());
}

function onBlurDescription(){
      var html = $(this).val();
      var viewableText = $("<p class='col-md-6 food-description editable'>");
      if(!html) {
        viewableText.html("Insert description");
      }
      else {
        viewableText.html(html);
      }
      $(this).replaceWith(viewableText);
      updateJSON_description(viewableText.parent().parent().attr('id'), 'title', viewableText.html());
}

function onBlurPrice(){
     var html = $(this).val();
      var viewableText = $("<span class='col-md-6 food-price editable'>");
      if(!html) {
        viewableText.html("Insert price");
      }
      else {
        viewableText.html(html);
      }
      $(this).replaceWith(viewableText);
     updateJSON_price(viewableText.parent().parent().attr('id'), 'title', viewableText.html());
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
