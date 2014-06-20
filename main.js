var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200);
	res.setHeader("Content-Type",'text/html');
	res.end('<h1>It works</h1>');
});
server.listen(8000);

