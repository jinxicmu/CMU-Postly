<?php
session_start();
include "config.php";
include "private_functions.php";
include "functions.php";

if(isset($_SESSION['auth']) && $_SESSION['auth'] == 1) {
	header('Location: '.$home.'index.php');
}

if(isset($_POST['username']) && isset($_POST['pw'])) {
	if ( preg_match('/^[A-Za-z0-9]+$/', $_POST['username']) ) {
		$pw = hash_pw($_POST['pw']);
		$dbh = db_connect($MY_HOST, $MY_DB_PORT, $MY_DB, $DB_USER, $DB_PW);
		$res = register($dbh, $_POST['username'],$pw);
		if($res['status'] == 1) {
			session_login($res['userID']);
			header("Location: ".$home."index.php");
		} else {
			$err_msg = "Invalid register";
		}
	} else { 
		$err_msg = "Usernames can only consist of letters or numbers"; 
	}
}


?>
<html>
	<head>
		<title>Register</title>
		<?php html_output_head(); ?>
	</head>
	<body>
 <div class="container">
		<?php html_nav('register'); ?>
      <div class="jumbotron">
		<form class="form-signin" role="form" action='register.php' method='POST'>
			<h2 class="form-signin-heading">Register</h2>
			<h3 class="form-signin-heading"><?php echo $err_msg; ?> </h3>
			<input type="text" class="form-control" name='username' placeholder="Username" required autofocus>
			<input type="password" class="form-control" name='pw' placeholder="Password" required>
			<button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
	  </form>
      </div>
	</body>
</html>
