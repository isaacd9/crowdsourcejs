var querystring = require("querystring");
var events = require("events").EventEmitter;
var sys = require("util");

var database = require("../database");

var submitHandler = require("./submitQuestionHandler");

module.exports.submitHandler = function(request) {
	return new submitHandler(request);
}
