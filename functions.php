<?php

include "config.php";

/*
 * For all functions $dbh is a database connection
 */

/*
 * @return handle to database connection
 */
function db_connect($host, $port, $db, $user, $pw) {
	if(!$dbh = pg_connect("host=$host port=$port dbname=$db user=$user password=$pw")){
		echo "invalid connection";
	}
	else{
		return $dbh;
	}
}

/*
 * Close database connection
 */ 
function close_db_connection($dbh) {
	pg_close($dbh);
}

/*
 * Login if user and password match
 * Return associative array of the form:
 * array(
 *		'status' =>  (1 for success and 0 for failure)
 *		'userID' => '[USER ID]'
 * )
 */
function login($dbh, $user, $pw) {
}

/*
 * Register user with given password 
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 *		'userID' => '[USER ID]'
 * )
 */
function register($dbh, $user, $pw) {
}

/*
 * Register user with given password 
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 * )
 */
function post_post($dbh, $title, $msg, $me) {
}


/*
 * Get timeline of $count most recent posts that were written before timestamp $start
 * For a user $user, the timeline should include all posts.
 * Order by time of the post (going backward in time), and break ties by sorting by the username alphabetically
 * Return associative array of the form:
 * array(
 *		'status' => (1 for success and 0 for failure)
 *		'posts' => [ (Array of post objects) ]
 * )
 * Each post should be of the form:
 * array(
 *		'pID' => (INTEGER)
 *		'username' => (USERNAME)
 *		'title' => (TITLE OF POST)
 *    'content' => (CONTENT OF POST)
 *		'time' => (UNIXTIME INTEGER)
 * )
 */
function get_timeline($dbh, $user, $count = 10, $start = PHP_INT_MAX) {
}

/*
 * Get list of $count most recent posts that were written by user $user before timestamp $start
 * Order by time of the post (going backward in time)
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 *		'posts' => [ (Array of post objects) ]
 * )
 * Each post should be of the form:
 * array(
 *		'pID' => (INTEGER)
 *		'username' => (USERNAME)
 *		'title' => (TITLE)
 *		'content' => (CONTENT)
 *		'time' => (UNIXTIME INTEGER)
 * )
 */
function get_user_posts($dbh, $user, $count = 10, $start = PHP_INT_MAX) {
}

/*
 * Deletes a post given $user name and $pID.
 * $user must be the one who posted the post $pID.
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success. 0 or 2 for failure)
 * )
 */
function delete_post($dbh, $user, $pID) {
}

/*
 * Records a "like" for a post given logged-in user $me and $pID.
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success. 0 for failure)
 * )
 */
function like_post($dbh, $me, $pID) {
}

/*
 * Check if $me has already liked post $pID
 * Return true if user $me has liked post $pID or false otherwise
 */
function already_liked($dbh, $me, $pID) {
}

/*
 * Find the $count most recent posts that contain the string $key
 * Order by time of the post and break ties by the username (sorted alphabetically A-Z)
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 *		'posts' => [ (Array of Post objects) ]
 * )
 */
function search($dbh, $key, $count = 50) {
}

/*
 * Find all users whose username includes the string $name
 * Sort the users alphabetically (A-Z)
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 *		'users' => [ (Array of user IDs) ]
 * )
 */
function user_search($dbh, $name) {
}


/*
 * Get the number of likes of post $pID
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 *		'count' => (The number of likes)
 * )
 */
function get_num_likes($dbh, $pID) {
}

/*
 * Get the number of posts of user $uID
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 *		'count' => (The number of posts)
 * )
 */
function get_num_posts($dbh, $uID) {
}

/*
 * Get the number of likes user $uID made
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 *		'count' => (The number of likes)
 * )
 */
function get_num_likes_of_user($dbh, $uID) {
}

/*
 * Get the list of $count users that have posted the most
 * Order by the number of posts (descending), and then by username (A-Z)
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 *		'users' => [ (Array of user IDs) ]
 * )
 */
function get_most_active_users($dbh, $count = 10) {
}

/*
 * Get the list of $count posts posted after $from that have the most likes.
 * Order by the number of likes (descending)
 * Return associative array of the form:
 * array(
 *		'status' =>   (1 for success and 0 for failure)
 *		'posts' => [ (Array of post objects) ]
 * )
 * Each post should be of the form:
 * array(
 *		'pID' => (INTEGER)
 *		'username' => (USERNAME)
 *		'title' => (TITLE OF POST)
 *    'content' => (CONTENT OF POST)
 *		'time' => (UNIXTIME INTEGER)
 * )
 */
function get_most_popular_posts($dbh, $count = 10, $from = 0) {
}

/*
 * Recommend posts for user $user.
 * A post $p is a recommended post for $user if like minded users of $user also like the post,
 * where like minded users are users who like the posts $user likes.
 * Result should not include posts $user liked.
 * Rank the recommended posts by how many like minded users like the posts.
 * The set of like minded users should not include $user self.
 *
 * Return associative array of the form:
 * array(
 *    'status' =>   (1 for success and 0 for failure)
 *    'posts' => [ (Array of post objects) ]
 * )
 * Each post should be of the form:
 * array(
 *		'pID' => (INTEGER)
 *		'username' => (USERNAME)
 *		'title' => (TITLE OF POST)
 *    'content' => (CONTENT OF POST)
 *		'time' => (UNIXTIME INTEGER)
 * )
 */
function get_recommended_posts($dbh, $count = 10, $user) {
}

/*
 * Delete all tables in the database and then recreate them (without any data)
 * Return associative array of the form:
 * )
 */
function reset_database($dbh) {
	$query =<<<EOF
		drop table if exists Likes;
		drop table if exists Users;
		drop table if exists Posts;
		Create table Users(
			username Char(50),
			password Char(20),
			primary key (username)
		);
		Create table Posts(
                        pID INTEGER,
                        username Char(20),
                        title varchar(80),
                        content varchar(140),
                        time INTEGER,
                        primary key(pID)
                );
		Create table Likes(
			username Char(50),
			pID INTEGER,
			primary key(username, pID),
			Foreign key (username) references Users on delete cascade,
			Foreign key (pID) references Posts on delete cascade
		);
EOF;
	$ret = pg_query($dbh, $query);
	if(!$ret){
      		echo pg_last_error($dbh);
	} else {
      		echo "Reset database successfully\n";
   	}
	return $ret;
}

?>
