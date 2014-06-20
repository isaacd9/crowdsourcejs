var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var views = require('./views');
var controllers = require('./controllers');

var server = http.createServer(function(req, res) {
	console.log("A request!");
	var uri = url.parse(req.url).pathname;
	if(uri == "/" || uri == "/view" || uri == "" ) {
		controllers.viewQuestion(res);
		return;
	}
	if(uri.substr(0,7) == "/public") {
		filename=path.join(process.cwd(), uri);
		fs.exists(filename, function(exists) {
			if(!exists) {
				res.writeHead(404, {"Content-Type": 'text/plain'});
				res.write("Error 404!");
				res.end();
				return;
				}
		fs.readFile(filename, "binary", function(err,file) {
			if (err) throw err
			res.writeHead(200);
			console.log("Hit public endpoint. Serving ".concat(filename));
			res.write(file, "binary");
			res.end();
			});
		});
	}

		else
			{	
				res.writeHead(404, {"Content-Type": 'text/plain'});
				res.write("Error 404!");
				res.end();
			}
	});
server.listen(8000);

