<?php

include "../config.php";
include "../functions.php";
include "../private_functions.php";

$num = 5;
if (isset($_GET['count']) && is_numeric($_GET['count'])) {
	$num = $_GET['count'];
}
$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
$resp = get_most_active_users($dbh,$num);
close_db_connection($dbh);
echo json_encode($resp);

?>
