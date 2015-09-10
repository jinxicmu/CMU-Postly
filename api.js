var apiTools = {
	evaluateResp: function (resp, expected, fn, sent_args) {
		fn = fn.substring(fn.indexOf("api/")+4, fn.indexOf(".php"));
		sent_args = Array.prototype.slice.call(sent_args);
		sent_args.pop();
		if (expected) {
			if(resp != expected) {
				console.log("\nERROR Response for " + fn);
				console.log("Arguments were: " + sent_args);
				console.log("Expected: " + expected);
				console.log("Received " + resp + "\n");
			} else {
				console.log("Correct response for " + fn + ' with arguments ' + sent_args);
			}
		} else {
			console.log(resp);
		}
	},

	evaluatePosts: function (resp, expected, fn, sent_args) {
		fn = fn.substring(fn.indexOf("api/")+4, fn.indexOf(".php"));
		sent_args = Array.prototype.slice.call(sent_args);
		sent_args.pop();
		if (expected) {
			var respObj = $.parseJSON(resp);
			var expectedObj = $.parseJSON(expected);

			var match = true;
			var msg = "";
			if (expectedObj['status'] == 1) {
				if ( expectedObj['posts'].length == respObj['posts'].length ) {
					for(var i = 0; i < expectedObj['posts'].length; i++) {
						var p1 = expectedObj['posts'][i];
						var p2 = respObj['posts'][i];
						if (p1['username'] != p2['username'] || p1['title'] != p2['title'] || p1['content'] != p2['content'] || !p2['time']) {
							match = false;
							msg = "Mismatch in post details.";
							break;
						}
					}
				}  else {
					match = false;
					msg = "Incorrect number of posts";
				}
			} else {
				match = (expectedObj['status'] == respObj['status']);
				msg = 'v2';
			}

			if(!match) {
				console.log("\nERROR Response for " + fn);
				console.log("Arguments were: " + sent_args);
				console.log("Expected: " + expected);
				console.log("Received " + resp);
				console.log(msg + "\n");
			} else {
				console.log("Correct response for " + fn + ' with arguments ' + sent_args);
			}
		} else {
			console.log(resp);
		}
	},

	login: function (user, pw, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/login.php?username="+user+"&pw="+encodeURIComponent(pw), { async : false} )
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	logout: function (expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/logout.php", { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	register: function (user, pw, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/register.php?username="+user+"&pw="+encodeURIComponent(pw), { async : false} )
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	post: function (flit, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/post.php?flit="+encodeURIComponent(flit), { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	delete_post: function (pID, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/delete_post.php?pID="+pID, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	timeline: function (num, start, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		if(num < 0) num = 10;
		if(start < 0) start = (new Date()).getTime() + (1000*60*60*24*365*10);
		var jqxhr = $.ajax( "api/timeline.php?count="+num+"&start_time="+start, { async : false})
		.done(function(resp) {
			apiTools.evaluatePosts(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	user_posts: function (user, num, start, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		if(num < 0) num = 10;
		if(start < 0) start = (new Date()).getTime() + (1000*60*60*24*365*10);
		var jqxhr = $.ajax( "api/user_posts.php?user="+user+"&count="+num+"&start_time="+start, { async : false})
		.done(function(resp) {
			apiTools.evaluatePosts(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	user_posts_paginated: function (user, num, expectedResponse2) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		if(num < 0) num = 5;
		var jqxhr = $.ajax( "api/user_posts.php?user="+user+"&count="+num, { async : false})
		.done(function(resp) {
			var respObj = $.parseJSON(resp);
			var posts = respObj['posts'];
			var last_time = posts[posts.length-1]['creation_time'];

			var jqxhr2 = $.ajax( "api/user_posts.php?user="+user+"&count="+num+"&start_time="+last_time, { async : false})
			.done(function(resp) {
				apiTools.evaluatePosts(resp,expectedResponse2,this.url,my_args);
			})


		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	like_post: function (pID, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/like.php?pID="+pID, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	already_liked: function (pID, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/already_liked.php?pID="+pID, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	get_recommended: function (num, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/get_recommended_posts.php?num="+num, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	search: function (keyword, num, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		if(num < 0) num = 10;
		var jqxhr = $.ajax( "api/search.php?count="+num+"&keyword="+encodeURIComponent(keyword), { async : false})
		.done(function(resp) {
			//apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
			apiTools.evaluatePosts(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	user_search: function (name, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/user_search.php?username="+name, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	get_num_likes: function (pID, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/get_num_likes.php?pID="+pID, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	get_num_posts: function (uID, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/get_num_posts.php?uID="+uID, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	get_num_likes_of_user: function (uID, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/get_num_likes_of_user.php?uID="+uID, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	get_most_active: function (num, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		if(num < 0) num = 10;
		var jqxhr = $.ajax( "api/most_active_users.php?count="+num, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	get_most_popular: function (num, from, expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		if(num < 0) num = 10;
		var jqxhr = $.ajax("api/most_popular_posts.php?count="+num+"&from="+from, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	},

	reset: function (secret,expectedResponse) {
		fn = arguments.callee.toString().substring(0, arguments.callee.toString().indexOf("("));
		my_args = arguments;
		var jqxhr = $.ajax( "api/reset.php?secret="+secret, { async : false})
		.done(function(resp) {
			apiTools.evaluateResp(resp,expectedResponse,this.url,my_args);
		})
		.fail(function() {
			console.log("The call to " + fn + " failed.");
		})
	}
}
