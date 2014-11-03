// var sql = require('mssql'); // microsoft sql driver
var SBApplication = require('../domain/Application.js');

//load the config
// var database = require('../config/database');

module.exports = function(app) {

	
	app.post('/api/applications', function(req, res) {

		var anApplication = new SBApplication();



		/**
		 * Create the application record
		 * 
		 * @param  {[type]} err [description]
		 * @param  {[type]} _id [description]
		 * @return {[type]}     [description]
		 */
		anApplication.create(req, res, function(err, _id) {

			if (err) {
				console.log('error');
				res.err({
					success: false,
					message: err
				});
			} else {
				res.send({
					success: true,
					id: anApplication.getId(),
					message: 'The application has been created'
				});
			}
		});

	});
}