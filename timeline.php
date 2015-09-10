<?php
session_start();
include "config.php";
include "private_functions.php";
include "functions.php";


if(!isset($_SESSION['auth']) || $_SESSION['auth'] == 0) {
	header('Location: '.$home.'login.php');
}

if(isset($_POST['message'])) {
	$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
	$res = post_post($dbh, $_POST['title'], $_POST['message'],$_SESSION['user']);
	if($res['status'] == 0) {
		$err_msg = "<h4 style='text-align:center;'>Error posting message</h4>";
	}
}

?>
<html>
	<head>
		<title>Postly</title>
		<?php html_output_head(); ?>
	</head>
	<body>
 <div class="container">
		<?php html_nav('timeline', $_SESSION['user']); ?>
	  <div class="row" style='border-bottom: 1px solid #ccc;'>
<?php echo $err_msg; ?>
		<form action='timeline.php' method='POST'>
	  <div class="row" style='padding-left: 30px; padding-right: 30px'>
			<input class="form-control" name="title" placeholder="title"></textarea>
	  </div>
	  <div class="row" style='padding-left: 30px; padding-right: 30px'>
			<textarea class="form-control" rows="4" name="message" placeholder="content"></textarea>
	  </div>
	  <div class="row" style='padding-left: 30px; padding-right: 30px; padding-top: 5px;'>
			<div class="col-md-10"></div>
			<div class="col-md-2"> <button class="btn btn-lg btn-primary btn-block" type="submit">Post</button> </div>
	  </div>
	  </form>
		</div>
<?php
$num_output = 0;
$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
if(isset($_GET['start'])) {
	$timeline = get_timeline($dbh, $_SESSION['user'], 15, $_GET['start']);
} else {
	$timeline = get_timeline($dbh, $_SESSION['user'], 15);
}
$last_time = -1;
if($timeline['status'] == 1) {
	$posts= $timeline['posts'];
	for($i = 0; $i < count($posts); $i++) {
    error_log($posts[$i]['time']);
		html_post($dbh, $posts[$i]);
		$num_output++;
		$last_time = $posts[$i]['time'];
	}
}

if($num_output == 0) {
	echo "<div class='row' style='font-size: 21px; padding-left: 30px; padding-right: 30px; padding-top: 5px;'> There appears to be no posts here.</div>";
} else if ($last_time > 0) {
	$timeline = get_timeline($dbh, $_SESSION['user'], 15, $last_time);
	if($timeline['status'] == 1) {
		if(count($timeline['posts']) > 0) {
			echo "<div class='row' style='text-align: center; font-size: 21px; padding-left: 30px; padding-right: 30px; margin-top: 35px;'> <a href='timeline.php?start=".$last_time."'>More</a></div>";
		}
	}
}

?>
	</body>
</html>
