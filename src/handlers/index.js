var querystring = require("querystring");
var events = require("events").EventEmitter;
var sys = require("util");

var database = require("../models");

var submitHandler = require("./submitQuestionHandler");
var ajaxHandler = require("./ajaxHandler");

module.exports.submitHandler = function(request) {
	return new submitHandler(request);
}

module.exports.voteHandler = function(request) {
	var ajaxhandler = new ajaxHandler(request);
	ajaxhandler.handleVotes();
	return ajaxhandler;
}
