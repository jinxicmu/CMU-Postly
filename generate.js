function waste_time() {
	var s = 0
	var t1 =(new Date()).getTime();
	for (var i = 0; i < Math.pow(2,29); i++) {
		s += i;
	}
	var t2 =(new Date()).getTime();
	//console.log((t2-t1));
}

function generate_data() {
	var password = "password";
	apiTools.reset("15415Reset")
	users = ["Alex", "Christos", "Vagelis", "Andy", "Ming", "Shen", "Jessica", "Jack", "Jill", "Patti", "Phil", "Stephen", "Cooper", "God"]
	for (i = 0; i < users.length; i++) {
		apiTools.register(users[i], password)
		apiTools.logout()
	}

	apiTools.login("Alex", password)
	for (var i = 1; i < users.length; i++) {
		apiTools.follow_user(users[i]);
	}	
	apiTools.unfollow_user("God");

	apiTools.post("Hello CMU");
	waste_time();
	apiTools.post("Welcome to CMU Flitter, HW 7 for 15-415 brought to you by me. #fun #haha #goodluck #hashtag");
	waste_time();
	apiTools.post("Better get #coding");
	waste_time();
	apiTools.logout();

	apiTools.login("Jessica", password)
    apiTools.follow_user("Alex")
    apiTools.follow_user("Patti")
    apiTools.follow_user("Phil")
    apiTools.follow_user("Jack")
	apiTools.logout()

	apiTools.login("Jill", password)
	apiTools.follow_user("Alex")
	apiTools.follow_user("Jessica")
	apiTools.follow_user("God")
	apiTools.logout()

	apiTools.login("Patti", password)
    apiTools.follow_user("Alex")
    apiTools.follow_user("Jessica")
    apiTools.follow_user("Jack")
    apiTools.follow_user("Phil")
    apiTools.follow_user("Stephen")
    apiTools.follow_user("Cooper")
    apiTools.follow_user("God")
	apiTools.logout()

    apiTools.login("Phil", password)
    apiTools.follow_user("Alex")
    apiTools.follow_user("Jessica")
    apiTools.follow_user("Jack")
    apiTools.follow_user("Phil")
    apiTools.follow_user("Stephen")
    apiTools.logout()

    apiTools.login("Stephen", password)
    apiTools.follow_user("Alex")
    apiTools.follow_user("Jessica")
    apiTools.follow_user("Cooper")
    apiTools.logout()
    apiTools.login("Christos", password)
    apiTools.follow_user("Alex")
    apiTools.follow_user("Vagelis")
    apiTools.follow_user("Andy")
    apiTools.logout()
    apiTools.login("Vagelis", password)
    apiTools.follow_user("Alex")
    apiTools.follow_user("Christos")
    apiTools.follow_user("Andy")
    apiTools.logout()
    apiTools.login("Andy", password)
    apiTools.follow_user("Alex")
    apiTools.follow_user("Christos")
    apiTools.follow_user("Vagelis")
    apiTools.logout()
    apiTools.login("Ming", password)
    apiTools.follow_user("Alex")
    apiTools.follow_user("Christos")
    apiTools.follow_user("Vagelis")
    apiTools.follow_user("Andy")
    apiTools.follow_user("Shen")
    apiTools.logout()
    apiTools.login("Shen", password)
    apiTools.follow_user("Alex")
    apiTools.follow_user("Christos")
    apiTools.follow_user("Vagelis")
    apiTools.follow_user("Andy")
    apiTools.follow_user("Ming")
    apiTools.logout()
    apiTools.login("God", password)
    apiTools.follow_user("Alex")
    apiTools.logout()

	apiTools.login("Christos", password)
	apiTools.post("uh oh... #oops #notagain")
	waste_time();
	apiTools.logout()

	apiTools.login("Andy", password)
	apiTools.post("CHRISTOS GOT ARRESTED AGAIN!!!")
	waste_time();
	apiTools.logout()

	apiTools.login("Vagelis", password)
	apiTools.post("Viva Korea!!")
	waste_time();
	apiTools.post("PEACE OUT SUCKERS! #notgradingthis #letsgoalex")
	waste_time();
	apiTools.logout()

	apiTools.login("Patti", password)
	apiTools.post("Alex, play this game")
	waste_time();
	apiTools.post("NEW HIGH SCORE IN #WORDSWITHFRIENDS")
	waste_time();
	apiTools.post("Alex, did you go to the doctor?")
	waste_time();
	apiTools.post("Stephen, call me!!!!! #whatsahashtag")
	waste_time();
	apiTools.post("PHILLIPPPPP!!!!")
	waste_time();
	apiTools.post("I LOVE MY FAMILY")
	waste_time();
	apiTools.post("I beat Alex for the bagillionth times in #WORDSWITHFRIENDS")
	waste_time();
	apiTools.logout()

	apiTools.login("Alex", password)
	apiTools.post("If you are sick of this, check out: http://gabrielecirulli.github.io/2048/ #addicted #2048")
	waste_time();
	apiTools.logout()

	apiTools.login("Stephen", password)
	apiTools.post("MARCH MADNESS #ncaa #basketball #hoops #notworking #march #madness #marchmadness #hashtag")
	waste_time();
	apiTools.post("HAHA DUKE LOST #suckitalex")
	waste_time();
	apiTools.logout()

	apiTools.login("Jessica", password)
	apiTools.post("#AMAZING")
	waste_time();
	apiTools.logout()

	apiTools.login("Jack", password)
	apiTools.post("Patti, we are going to the airport")
	waste_time();
	apiTools.logout()

	apiTools.login("Patti", password)
	apiTools.post("I beat #2048 !!!!")
	waste_time();
	apiTools.logout()

	console.log("Done")
}

function test_basic_functionality() {
	var password = "password";

	console.log("\n\nTest Functionality\n\n");

    apiTools.logout('{"status":1}');
    apiTools.login("Jack", password,'{"status":1,"userID":"Jack"}')
    apiTools.follow_user("Alex2", '{"status":0}');
    apiTools.unfollow_user("Christos", '{"status":2}');
    apiTools.post("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue lectus a sollicitudin laoreet. Proin lacinia sodales nunc sed ultrices. Integer a mollis tellus. Nullam sagittis dapibus ante sed iaculis. Nullam congue quam nulla, eu auctor enim lacinia aliquet. Nullam sed neque mi. Duis ultricies diam ac dictum luctus. Pellentesque.", '{"status":0}');
    apiTools.logout('{"status":1}')
    apiTools.login("Jessica", password,'{"status":1,"userID":"Jessica"}')
    apiTools.get_recommended('{"status":1,"users":["Stephen","Cooper","Andy","Christos","God","Jill","Ming","Shen","Vagelis"]}')
    apiTools.logout('{"status":1}')
    apiTools.register("Bobbie", password,'{"status":1,"userID":"Bobbie"}')
    apiTools.logout('{"status":1}')
    apiTools.login("Bobbie", password,'{"status":1,"userID":"Bobbie"}')
    apiTools.post("Hello?", '{"status":1}')
    apiTools.logout('{"status":1}')
    apiTools.get_most_active(5,'{"status":1,"users":["Patti","Alex","Stephen","Vagelis","Andy"]}')
    apiTools.get_most_popular(5,'{"status":1,"users":["Alex","Andy","Christos","Jessica","Vagelis"]}')
    apiTools.get_hub_users(5, '{"status":1,"users":["Alex","Jessica","Patti","Phil","Andy"]}')
    apiTools.user_posts('Phil',5,-1,'{"status":1,"posts":[]}')
    apiTools.user_posts('Stephen',5,-1,'{"status":1,"posts":[{"username":"Stephen","message":"HAHA DUKE LOST #suckitalex","creation_time":"1395601501"},{"username":"Stephen","message":"MARCH MADNESS #ncaa #basketball #hoops #notworking #march #madness #marchmadness #hashtag","creation_time":"1395601500"}]}')
    apiTools.user_posts_paginated('Alex',2,'{"status":1,"posts":[{"username":"Alex","message":"Welcome to CMU Flitter, HW 7 for 15-415 brought to you by me. #fun #haha #goodluck #hashtag","creation_time":"1395601467"},{"username":"Alex","message":"Hello CMU","creation_time":"1395601465"}]}')
    apiTools.search("#2048",5,'{"status":1,"posts":[{"username":"Patti","message":"I beat #2048 !!!!","creation_time":"1395604288"},{"username":"Alex","message":"If you are sick of this, check out: http:\/\/gabrielecirulli.github.io\/2048\/ #addicted #2048","creation_time":"1395604280"}]}')
    apiTools.user_search("J",'{"status":1,"users":["Jack","Jessica","Jill"]}')
    apiTools.get_followers("Christos",'{"status":1,"users":["Alex","Andy","Ming","Shen","Vagelis"]}')
    apiTools.get_followees("Jessica", '{"status":1,"users":["Alex","Jack","Patti","Phil"]}')
    apiTools.get_num_followers("Jessica", '{"status":1,"count":"5"}')
    apiTools.get_num_followees("Jessica", '{"status":1,"count":"4"}')
    apiTools.login("Christos", password,'{"status":1,"userID":"Christos"}')
    apiTools.timeline(3,-1,'{"status":1,"posts":[{"username":"Alex","message":"If you are sick of this, check out: http:\/\/gabrielecirulli.github.io\/2048\/ #addicted #2048","creation_time":"1395601498"},{"username":"Vagelis","message":"PEACE OUT SUCKERS! #notgradingthis #letsgoalex","creation_time":"1395601484"},{"username":"Vagelis","message":"Viva Korea!!","creation_time":"1395601483"}]}')
    apiTools.check_if_follows("Alex", '{"status":1}')
    apiTools.check_if_follows("Jessica", '{"status":0}')
    apiTools.logout('{"status":1}')

	console.log("Done")
}
