exports.dbconnect = function() {
	var Sequelize = require('sequelize'),
		sequelize = new Sequelize('crowdsource', 'root', 'nodeisfun', {
			dialect: "mysql",
			port: 3306,
		});

	sequelize.authenticate().complete(function(error) {
		if (!!error) {
			throw error;
		}
	});
	
	var question = sequelize.import('models/question.js');
	
	return sequelize;
}
