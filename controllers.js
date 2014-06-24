var path = require('path');
var fs = require('fs');

var models = require('./database');
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

exports.viewQuestion = function(response) {
		response.writeHead(200, {'Content-Type': 'text/html' });
		var context = {"question" : "Why did the chicken cross the road?",
				"yes" : 0,
				"no" : 5};
		views.renderView(response, "viewquestion", context);
		console.log("Hit views endpoint");
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

