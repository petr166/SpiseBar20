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
    }
  });
}
