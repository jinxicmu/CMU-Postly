<?php
session_start();
include "config.php";
include "private_functions.php";
include "functions.php";


$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
?>
<html>
	<head>
		<title>Postly</title>
		<?php html_output_head(); ?>
	</head>
	<body>
 <div class="container">
		<?php html_nav('findUsers', $_SESSION['user']); ?>

	  <div class="row" style='border-bottom: 1px solid #ccc;'>
		<form action='find_users.php' method='GET'>
	  <div class="row" style='padding-left: 30px; padding-right: 30px; padding-top: 5px;'>
			<div class="col-md-10"> <input style='height: 45px; padding:10px; font-size: 21px' type="text" class="form-control" name='username' placeholder="Username" required autofocus> </div>
			<div class="col-md-2"> <button class="btn btn-lg btn-primary btn-block" type="submit">Search</button> </div>
	  </div>
	  </form>
		</div>


<?php

$num_results = 0;
if(isset($_GET['username'])) {
	$resp = user_search($dbh, $_GET['username']);
	if($resp['status'] == 1) {
		$users = $resp['users'];
		for($i = 0; $i < count($users); $i++) {
			html_user($dbh, $users[$i], $_SESSION['user']);  
			$num_results++;
		}
	} else { 
		echo "There was  an error with your search";
	}
}

if($num_results == 0 && isset($_SESSION['auth']) && $_SESSION['auth'] == 1) {
	$resp = recommend_followees($dbh, $_SESSION['user']);
	if($resp['status'] == 1) {
		$users = $resp['users'];
		for($i = 0; $i < count($users); $i++) {
			html_user($dbh, $users[$i], $_SESSION['user']);  
			$num_results++;
		}
	} 
}

?>
	</body>
</html>
