<?php

include "../config.php";
include "../functions.php";

echo "hello world";
if(isset($_GET['secret']) && $_GET['secret'] == "15415Reset") {
	$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
	$result = reset_database($dbh);
	close_db_connection($dbh);
	echo json_encode($result);
	echo "executed";
} else {
	echo "hello world";
	echo json_encode(array("status" => 0));
}


?>
