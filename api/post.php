<?php

session_start();
include "../config.php";
include "../functions.php";
include "../private_functions.php";

if(isset($_SESSION['auth']) && $_SESSION['auth'] == 1 && isset($_GET['flit'])) {
	$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
	$res = post_post($dbh, $_GET['title'], $_GET['flit'], $_SESSION['user']);
	close_db_connection($dbh);
	echo json_encode($res);
} else {
	echo json_encode(array("status" => -1));
}

?>
