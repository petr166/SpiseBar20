<?php
  $reqMethod = $_SERVER['REQUEST_METHOD']; //store the request method

  switch ($reqMethod) {
    //handle the GET method
    case 'GET':
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


    //handle the POST method
    case 'POST':
      try {
        $jsonObj = $_POST['newData'];
      }
      catch(Exception $e) {
        $badResp = '{
            "code" : "400",
            "status" : "Bad Request",
            "msg" : "The POST request may contain the updated data set"
        }';
        echo $badResp;
        die;
      }

      $file = "data.json"; //store the file path
      file_put_contents($file, $jsonObj); //overwrite the file with the updated data

      //build the response
      $response = '{
        "code" : "200",
        "status" : "OK"
      }';

      echo $response; //send the response
      break;

    default: //method not accepted
      $badResp = '{
          "code" : "400",
          "status" : "Bad Request",
          "msg" : "This API will only respond to GET or POST requests"
      }';
      echo $badResp;
      die;
      break;
  }
?>
