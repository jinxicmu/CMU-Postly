<?php

include "../config.php";
include "../functions.php";
include "../private_functions.php";

if(isset($_GET['pID'])) {
	$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
	$resp = get_num_likes($dbh, $_GET['pID']);
	close_db_connection($dbh);
	echo json_encode($resp);
} else {
	echo json_encode(array("status" => -1));
}

?>
