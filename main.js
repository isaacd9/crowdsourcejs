var http = require('http');

var views = require('./views');

var server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html' });
	
	views.renderView(res, "index", {what: "It"});
});
server.listen(8000);

