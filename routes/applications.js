// var sql = require('mssql'); // microsoft sql driver
var SBApplication = require('../domain/Application.js');
var Owner = require('../domain/Owner.js');

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


	// Create an Owner record;
	app.post('/api/applications/:application_id/owners', function(req, res) {

		var aOwner = new Owner();

		aOwner.create(req.params.application_id, req, function(err, _owner) {

			if (err) {
				console.log('Error ', err);
				res.err({
					success: false,
					message: err
				});
			} else {
				res.send({
					success: true,
					id: _owner.getId(),
					message: 'The owner has been created'
				});
			}

		});

	});


	/**
	 * Return a list of owners for the specified application;
	 */
	app.get('/api/applications/:application_id/owners', function(req, res) {

		var appId = req.params.application_id;

		var anApplication = new SBApplication();
		anApplication.setId(appId);

		anApplication.getOwners(
			function(err, recordset) {
				res.json({
					success: true,
					owners: recordset
				});
			});



	});


	app.get('/api/applications', function(req, res) {

		var anApplication = new SBApplication();

		anApplication.getApplications(
			function(err, recordset) {
				res.json({
					success: true,
					applications: recordset
				});
			});


	});







}