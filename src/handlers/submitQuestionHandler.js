var querystring = require("querystring");
var events = require("events").EventEmitter;
var sys = require("util");

var database = require("../models");

function submitHandler(request) {
	this.request=request;
	events.call(this);
	this.handle();
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
				thisSubmitHandler.emit("success",newquestion.id);
				return;
		});
	});
}

module.exports = submitHandler;
