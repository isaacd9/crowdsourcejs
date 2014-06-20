var fs = require('fs');
var path = require('path');
var Mustache = require('mustache');

exports.renderView = function(response, viewname, context ) {
	fs.readFile(path.join('views',viewname.concat('.ms')), {encoding: 'ascii'}, function(error, data) {
		response.end(Mustache.render(data, context));
	});
};
