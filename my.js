function like(pID, btn) {
	var jqxhr = $.ajax( "api/like.php?pID="+pID)
	.done(function(resp) {
		var json = $.parseJSON(resp);
		if(json['status'] == 1) {
			updateLikes(pID);
		} else if(json['status'] == -2) {
      alert("You've already liked this post.");
    } else {
			alert("There was an error in your request.");
		}
	})
}

function updateLikes(pID) {
	var jqxhr = $.ajax( "api/get_num_likes.php?pID="+pID+"&r="+(new Date()).getTime() )
	.done(function(resp) {
		var json = $.parseJSON(resp);
    console.log(json);
		if(json['status'] == 1) {
			postRow = document.getElementById("post-"+pID);
      console.log(postRow.children);
			postRow.children[1].children[1].innerHTML = json['count'] + " likes";
		} 
	})
}
