var views = require('./views');

exports.viewQuestion = function(response) {
		response.writeHead(200, {'Content-Type': 'text/html' });
		views.renderView(response, "viewquestion");
		console.log("Hit views endpoint");
}
