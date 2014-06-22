var querystring = require("querystring");

var database = require("./database");

exports.submitHandler = function(request) {
	var postData = "";
	request.on('data', function(content) {
		postData+=content;
	});
	request.on('end', function(request) {
		console.log(querystring.parse(postData).question);
	});
}
