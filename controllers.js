var path = require('path');
var fs = require('fs');

var database = require('./database');
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

exports.viewQuestion = function(response, id) {
	if(!!id) {	
		response.writeHead(200, {'Content-Type': 'text/html' });
		var question = database.question;

		question.find(id).success(function(question) {
			if(!!question) {
				var context = {"question" : question.question, 
						"yes" : question.yes,
						"no" : question.no};
			console.log(question);
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
	else {
		console.log("no id");
		return;
	}
	
}

exports.submitQuestion = function(response) {
		response.writeHead(200, {'Content-Type': 'text/html' });
		views.renderView(response, "submit");
		console.log("Hit submit endpoint");
}

exports.staticFileServer = function(response, uri) {
		filename=path.join(process.cwd(), uri);
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

