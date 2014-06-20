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
		controllers.staticFileServer(res, uri);
		return;
	}

	else
	{	
		res.writeHead(404, {"Content-Type": 'text/plain'});
		res.write("Error 404!");
		res.end();
	}
	});
server.listen(8000);

