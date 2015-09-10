<?php

session_start();
include "../config.php";
include "../functions.php";
include "../private_functions.php";

if(isset($_SESSION['auth']) && $_SESSION['auth'] == 1 && isset($_GET['pID'])) {
	$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
  if(already_liked($dbh, $_SESSION['user'], $_GET['pID'])) {
    echo json_encode(array("status" => -2));
  } else {
    $res = like_post($dbh,  $_SESSION['user'], $_GET['pID']);
    close_db_connection($dbh);
    echo json_encode($res);
  }
} else {
	echo json_encode(array("status" => -1));
}

?>
