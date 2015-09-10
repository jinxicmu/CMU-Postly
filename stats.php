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
		<?php html_nav('stats', $_SESSION['user']); ?>

	  <div class="row" style='border-bottom: 1px solid #000; margin-bottom: 10px;'>
		  <div class="row" style='padding-left: 10px; padding-right: 10px; padding-top: 5px;'>
				<div class="col-md-10"><h2>Most Active Users</h2></div>
		  </div>
		</div>
<?php
$resp = get_most_active_users($dbh, 5);
if($resp['status'] == 1) {
	$users = $resp['users'];
	for($i = 0; $i < count($users); $i++) {
		html_user($dbh, $users[$i], $_SESSION['user']);  
		$num_results++;
	}
}

?>

<?php

$filter = "";
if(isset($_GET['filter'])) {
  $filter = $_GET['filter'];
}
$from = 0;
$span_all = '<span style="font-size:12px; color: #888; padding:5px; padding-left: 10px;"><a href="stats.php?filter=all">all</a></span>';
$span_daily = '<span style="font-size:12px; color: #888; padding:5px; padding-left: 10px;"><a href="stats.php?filter=daily">daily<a></span>';
$span_weekly = '<span style="font-size:12px; color: #888; padding:5px; padding-left: 10px;"><a href="stats.php?filter=weekly">weekly</a></span>';
$span_monthly = '<span style="font-size:12px; color: #888; padding:5px; padding-left: 10px;"><a href="stats.php?filter=monthly">monthly</a></span>';
if($filter == "daily") {
  $from = time() - (60 * 60 * 24);
  $span_daily = '<span style="font-size:12px; color: #888; padding:5px; padding-left: 10px;">daily</span>';
} elseif($filter == "weekly") {
  $from = time() - (60 * 60 * 24 * 7);
  $span_weekly = '<span style="font-size:12px; color: #888; padding:5px; padding-left: 10px;">weekly</span>';
} elseif($filter == "monthly") {
  $from = time() - (60 * 60 * 24 * 7 * 30);
  $span_monthly = '<span style="font-size:12px; color: #888; padding:5px; padding-left: 10px;">monthly</span>';
} else {
  $from = 0;
  $span_all = '<span style="font-size:12px; color: #888; padding:5px; padding-left: 10px;">all</span>';
}

echo '<div class="row" style="border-bottom: 1px solid #000; margin-bottom: 10px; padding-top:20px;">
		  <div class="row" style="padding-left: 10px; padding-right: 10px; padding-top: 5px;">
				<div class="col-md-10"><h2>Most Popular Posts</h2>'.$span_all.' '.$span_daily.' '.$span_weekly.' '.$span_monthly.'
        </div>
		  </div>
		</div>';

$resp = get_most_popular_posts($dbh, 5, $from);
if($resp['status'] == 1) {
	$posts = $resp['posts'];
	for($i = 0; $i < count($posts); $i++) {
		html_post($dbh, $posts[$i]);  
		$num_results++;
	}
}

?>
	  <div class="row" style='border-bottom: 1px solid #000; margin-bottom: 10px; padding-top:20px;'>
		  <div class="row" style='padding-left: 10px; padding-right: 10px; padding-top: 5px;'>
				<div class="col-md-10"><h2>Recommended Posts</h2></div>
		  </div>
		</div>
<?php
$resp = get_recommended_posts($dbh, 5, $_SESSION['user']);
if($resp['status'] == 1) {
	$posts = $resp['posts'];
	for($i = 0; $i < count($posts); $i++) {
		html_post($dbh, $posts[$i]);  
		$num_results++;
	}
}

?>
	</body>
</html>
