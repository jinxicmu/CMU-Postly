<?php
session_start();
include "config.php";

if(!isset($_SESSION['auth']) || $_SESSION['auth'] == 0) {
	header('Location: '.$home.'login.php');
}
header('Location: '.$home.'timeline.php');

?>
<html>
	<head>
	</head>
	<body>
	</body>
</html>
