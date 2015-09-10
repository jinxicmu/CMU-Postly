<?php

include "../config.php";
include "../functions.php";
include "../private_functions.php";

if(isset($_GET['user'])) {
	$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
	$num = 10;
	$start = PHP_INT_MAX;
	if(isset($_GET['count']) && is_numeric($_GET['count'])) {
		$num = $_GET['count'];
	}	
	if(isset($_GET['start_time'])) {
		$start = $_GET['start_time'];
	}	
	$res = get_user_posts($dbh, $_GET['user'], $num, $start);
	close_db_connection($dbh);
	echo json_encode($res);
} else {
	echo json_encode(array("status" => -1));
}

?>
