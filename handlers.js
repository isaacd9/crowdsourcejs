var querystring = require("querystring");
var events = require("events").EventEmitter;
var sys = require("util");

var database = require("./database");

function submitHandler(request) {
	this.request=request;
	events.call(this);
}

sys.inherits(submitHandler, events);

submitHandler.prototype.handle = function() {
	var thisSubmitHandler=this;
	var postData = "";
	this.request.on('data', function(content) {
		postData+=content;
	});
	this.request.on('end', function() {
		question = querystring.parse(postData).question;
		console.log(question);
		var newquestion = database.question.build({question: question, yes: 0, no: 0});
		newquestion.save().success(function() {
				console.log(newquestion);
				thisSubmitHandler.emit("success",newquestion.id);
				return;
		});
	});
}

module.exports.submitHandler = function(request) {
	var submithandler = new submitHandler(request);
	submithandler.handle();
	return submithandler;
}
