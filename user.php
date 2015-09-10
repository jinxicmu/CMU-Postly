<?php
session_start();
include "config.php";
include "private_functions.php";
include "functions.php";

if(!isset($_GET['user'])) {
	header('Location: '.$home.'login.php');
}

$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
?>
<html>
	<head>
		<title>Postly</title>
		<?php html_output_head(); ?>
	</head>
	<body>
 <div class="container">
		<?php html_nav('user', $_SESSION['user']); ?>

<?php html_user($dbh, $_GET['user'], $_SESSION['user']); ?>

<?php

$num_posts = 0;
if(isset($_GET['start'])) {
	$resp = get_user_posts($dbh, $_GET['user'], 15, $_GET['start']);
} else {
	$resp = get_user_posts($dbh, $_GET['user'], 15);
}
$last_time = -1;
if($resp['status'] == 1) {
	$posts= $resp['posts'];
	for($i = 0; $i < count($posts); $i++) {
		html_post($dbh, $posts[$i]);
		$num_posts++;
		$last_time = $posts[$i]['time'];
	}
}

if($num_posts == 0) {
	echo "<div class='row' style='font-size: 21px; padding-left: 30px; padding-right: 30px; padding-top: 5px;'> There appears to be no posts here.</div>";
} else if ($last_time > 0) {
	$resp = get_user_posts($dbh, $_GET['user'], 15, $last_time);
	if($resp['status'] == 1) {
		if(count($resp['posts']) > 0) {
			echo "<div class='row' style='text-align: center; font-size: 21px; padding-left: 30px; padding-right: 30px; margin-top: 35px;'> <a href='user.php?user=".$_GET['user']."&start=".$last_time."'>More</a></div>";
		}
	}
} 
?>
	</body>
</html>
