var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var views = require('./views');
var controllers = require('./controllers');
var handlers = require('./handlers');

var server = http.createServer(function(req, res) {
	console.log("A request!");
	var uri = url.parse(req.url).pathname;
	console.log(uri);
	if(uri == "/" || uri.match(/view\/(\d+)?/ig) != null) {
		questionid = parseInt(uri.match(/\d+/g));
		console.log(questionid);
		controllers.viewQuestion(res,questionid);
		return;
	}
	else if(uri == "/submit") {
		console.log(req.method);
		if(req.method == "GET") {
			controllers.submitQuestion(res);
		}
		if(req.method == "POST") {
			handlers.submitHandler(req).on("success", function(id){
				console.log("lol heyy");
				controllers.redirect(res,'view/'.concat(id));		
			});
		}
		return;
	}
	else if(uri == "/ajax/vote") {
		console.log("hit ajax handler!");
		handlers.voteHandler(req).on("success", function(){
			console.log("yay")
			controllers.renderJSON(res, {message: "success"});
		});
	}
	else if(uri.substr(0,7) == "/public") {
		controllers.staticFileServer(res, uri);
		return;
	}
	else
	{
		controllers.notFound(res);	
		return;
	}
	});
server.listen(8000);

