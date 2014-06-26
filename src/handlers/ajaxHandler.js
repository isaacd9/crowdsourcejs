var querystring = require("querystring");
var events = require("events").EventEmitter;
var sys = require("util");

var database = require("../models");

function ajaxHandler(request) {
	this.request=request;
	events.call(this);
}

sys.inherits(ajaxHandler, events);

ajaxHandler.prototype.handleVotes = function() {
	var thisHandler=this;
	var postData = "";
	this.request.on('data', function(content) {
		postData+=content;
	});
	this.request.on('end', function() {
		questionId = parseInt(querystring.parse(postData).questionid);
		vote = querystring.parse(postData).vote.toLowerCase();
		console.log("vote "+vote);
			if(!(vote == "yes" || vote == "no")) {
				 return;
			}
		var questionObject = database.question;
		questionObject.find(questionId).success(function(questionobject) {
			questionobject.increment(vote).success(function() {
				thisHandler.emit("success");
				return;
			});
		});
	});
}

module.exports = ajaxHandler;
