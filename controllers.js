var path = require('path');
var fs = require('fs');

var views = require('./views');


exports.viewQuestion = function(response) {
		response.writeHead(200, {'Content-Type': 'text/html' });
		views.renderView(response, "viewquestion");
		console.log("Hit views endpoint");
}

exports.staticFileServer = function(response, uri) {
		filename=path.join(process.cwd(), uri);
		fs.exists(filename, function(exists) {
			if(!exists) {
				response.writeHead(404, {"Content-Type": 'text/plain'});
				response.write("Error 404!");
				response.end();
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
