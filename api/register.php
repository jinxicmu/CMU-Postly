<?php

session_start();
include "../config.php";
include "../functions.php";
include "../private_functions.php";

if(isset($_GET['username']) && isset($_GET['pw'])) {
	if ( preg_match('/^[A-Za-z0-9]+$/', $_GET['username']) ) {
		$pw = hash_pw($_GET['pw']);
		$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
		$res = register($dbh, $_GET['username'],$pw);
		close_db_connection($dbh);
		if($res['status'] == 1) {
			session_login($res['userID']);
		}
		echo json_encode($res);
	} else {
		echo json_encode(array("status" => 0));
	}
} else {
	echo json_encode(array("status" => 0));
}


?>
