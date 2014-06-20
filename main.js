var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var views = require('./views');

var server = http.createServer(function(req, res) {
	
	var uri = url.parse(req.url).pathname;
	if(uri == "/" || uri == "/view" || uri == "" ) {
		res.writeHead(200, {'Content-Type': 'text/html' });
		views.renderView(res, "viewquestion");
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

