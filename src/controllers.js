var path = require('path');
var fs = require('fs');

var database = require('./models');
var views = require('./views');

exports.notFound = function(response) {
		response.writeHead(404, {"Content-Type": 'text/plain'});
		response.write("Error 404!");
		response.end();
}

exports.redirect = function(response, redirectURL) {
		response.writeHead(301, {'Location' : '../'.concat(redirectURL)});
		response.end();
}

exports.renderJSON = function(response, json) {
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.write(JSON.stringify(json));
		response.end();
}

exports.viewQuestion = function(response, id) {
		response.writeHead(200, {'Content-Type': 'text/html' });
		var Question = database.question;
		if(!!!id) {
			Question.count().success(function(numberOfQuestions) {
					id=Math.floor((Math.random()*numberOfQuestions) +1);
					
					Question.find(id).success(function(question) {
					if(!!question) {
						var context = {"question" : question.question, 
							"yes" : question.yes,
							"no" : question.no,
							"id" : question.id};
						views.renderView(response, "viewquestion", context);
						}
					else {
						exports.redirect(response, "/view");
						}
					});
				});
			}
		else {
		Question.find(id).success(function(question) {
			if(!!question) {
				var context = {"question" : question.question, 
						"yes" : question.yes,
						"no" : question.no,
						"id" : question.id};
			views.renderView(response, "viewquestion", context);
			console.log("Hit views endpoint");
			}
			else {
				exports.notFound(response);
				return;
			}
		
		}).error(function() {
			exports.notFound(response);
			return;
		});
		}
}

exports.submitQuestion = function(response) {
		response.writeHead(200, {'Content-Type': 'text/html' });
		views.renderView(response, "submit");
		console.log("Hit submit endpoint");
}

exports.staticFileServer = function(response, uri) {
		filename=path.join(process.cwd(), "../", uri);
		fs.exists(filename, function(exists) {
			if(!exists) {
				exports.notFound(response);
				return;
			}
		fs.readFile(filename, "binary", function(err,file) {
			if (err) throw err
			response.writeHead(200);
			console.log("Hit public endpoint. Serving ".concat(filename));
			response.write(file, "binary");
			response.end();
			});
		});
}

