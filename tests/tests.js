var expect = chai.expect;

describe("Single User API tests", function() {

    it("reset database", function(alldone) {
        this.timeout(5000);
        $.ajax("../api/reset.php?secret=15415Reset")
            .success(function(data) {
                var response = JSON.parse(data);
                expect(response).to.deep.equal({
                    'status': 1
                });
                alldone();
            })
            .error(function(error) {
                expect(error).to.be.undefined.
                alldone();
            });
    });

    describe("user login/logout lifecycle", function() {
        it("register", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/register.php?username=johndoe&pw=1234567')
                .success(function(data) {
                    var response = JSON.parse(data);
                    expect(response).to.deep.equal({
                        'status': 1,
                        'userID': 'johndoe'
                    });
                    alldone();
                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });

        it("login", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/login.php?username=johndoe&pw=1234567')
                .success(function(data) {
                    var response = JSON.parse(data);
                    expect(response).to.deep.equal({
                        'status': 1,
                        'userID': 'johndoe'
                    });
                    alldone();
                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });

        it("logout", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/logout.php')
                .success(function(data) {
                    var response = JSON.parse(data);
                    expect(response).to.deep.equal({
                        'status': 1
                    });
                    alldone();
                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });

        it("login again", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/login.php?username=johndoe&pw=1234567')
                .success(function(data) {
                    var response = JSON.parse(data);
                    expect(response).to.deep.equal({
                        'status': 1,
                        'userID': 'johndoe'
                    });
                    alldone();
                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });
    });

    describe("timeline", function() {
        it("is by default empty", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/timeline.php')
                .success(function(data) {
                    var response = JSON.parse(data);
                    expect(response).to.deep.equal({
                        'status': 1,
                        'posts': []
                    });
                    alldone();
                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });

        it("can be posted with articles", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/post.php?title=hello%20world&flit=my%20life%20is%20cool')
                .success(function(data) {
                    var response = JSON.parse(data);
                    expect(response).to.deep.equal({
                        'status': 1
                    });
                    alldone();
                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });

        it("then show the posted article", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/timeline.php')
                .success(function(data) {
                    var response = JSON.parse(data);
                    expect(response.status).to.equal(1);
                    expect(response.posts).to.have.length(1);
                    expect(response.posts[0].title).to.equal('hello world');
                    expect(response.posts[0].username).to.equal('johndoe');
                    expect(response.posts[0].content).to.equal('my life is cool');
                    alldone();
                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });

        it("should how another article after posted", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/post.php?title=goodbye%20world&flit=my%20life%20is%20uncool')
                .success(function(data) {
                    var response = JSON.parse(data);
                    expect(response).to.deep.equal({
                        'status': 1
                    });
                    alldone();
                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });

        it("then show both posted articles, sorted by time", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/timeline.php')
                .success(function(data) {
                    var response = JSON.parse(data);
                    expect(response.status).to.equal(1);
                    expect(response.posts).to.have.length(2);
                    
                    expect(response.posts[0].title).to.equal('goodbye world');
                    expect(response.posts[0].username).to.equal('johndoe');
                    expect(response.posts[0].content).to.equal('my life is uncool');
                    expect(response.posts[0].pID).to.equal('2');

                    expect(response.posts[1].title).to.equal('hello world');
                    expect(response.posts[1].username).to.equal('johndoe');
                    expect(response.posts[1].content).to.equal('my life is cool');
                    expect(response.posts[1].pID).to.equal('1');
                    
                    alldone();
                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });

        it("should also support deletion", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/delete_post.php?pID=2')
                .success(function(data) {
                    expect(JSON.parse(data)).to.deep.equal({
                        'status': 1
                    });
                    $.ajax('../api/timeline.php')
                        .success(function(data) {
                            var response = JSON.parse(data);
                            expect(response.status).to.equal(1);
                            expect(response.posts).to.have.length(1);
                            expect(response.posts[0].title).to.equal('hello world');
                            expect(response.posts[0].username).to.equal('johndoe');
                            expect(response.posts[0].content).to.equal('my life is cool');
                            alldone();
                        })
                        .error(function(error) {
                            expect(error).to.be.undefined.
                            alldone();
                        });

                })
                .error(function(error) {
                    expect(error).to.be.undefined.
                    alldone();
                });
        });
    });

    describe('search posts', function() {
        it("returns article based on content", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/search.php?keyword=cool')
                .success(function(data) {
                    var response =
                        JSON.parse(data);
                    expect(response.status).to.equal(1);
                    expect(response.posts).to.have.length(1);
                    expect(response.posts[0].title).to.equal('hello world');
                    expect(response.posts[0].username).to.equal('johndoe');
                    expect(response.posts[0].content).to.equal('my life is cool');
                    alldone();
                }).error(function(error) {
                    expect(error).to.be.undefined.alldone();
                });

        });
    });

    describe('search users', function() {
        it("returns users based on document", function(alldone) {
            this.timeout(5000);
            $.ajax('../api/user_search.php?username=doe')
                .success(function(data) {
                    var response =
                        JSON.parse(data);
                    expect(response.status).to.equal(1);
                    expect(response.users).to.have.length(1);
                    expect(response.users[0]).to.equal('johndoe');
                    alldone();
                }).error(function(error) {
                    expect(error).to.be.undefined.alldone();
                });

        });
    });

});

