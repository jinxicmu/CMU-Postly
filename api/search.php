<?php

include "../config.php";
include "../functions.php";
include "../private_functions.php";

if(isset($_GET['keyword'])) {
	$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
	$num = 10;
	if(isset($_GET['count']) && is_numeric($_GET['count'])) {
		$num = $_GET['count'];
	}	
	$res = search($dbh, $_GET['keyword'], $num);
	close_db_connection($dbh);
	echo json_encode($res);
} else {
	echo json_encode(array("status" => -1));
}

?>
