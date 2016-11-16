<?php
  $reqMethod = $_SERVER['REQUEST_METHOD']; //store the request method

  switch ($reqMethod) {
    case 'GET': //handle the GET method
      $file = "data.json"; //store the file path
      $data = file_get_contents($file); //read the file

      //build the response
      $response = '{
        "code" : "200",
        "status" : "OK",
        "data" : '. $data .'
      }';

      echo $response; //send the response
      break;

    case 'POST': //handle the POST method
      # code...
      break;

    default: //method not accepted
      echo '{
          "code":"400",
          "status":"Bad Request",
          "msg":"This API will only respond to GET or POST requests"
      }';
      die;
      break;
  }
?>