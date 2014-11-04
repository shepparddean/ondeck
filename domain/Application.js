var sql = require('mssql'); // microsoft sql driver

//The business applicant 
var BusinessApplicant = require('../domain/BusinessApplicant.js');
var CreditUnion = require('../domain/CreditUnion.js');
var database = require('../config/database');

//Public
module.exports = SBApplication;


//Private
function SBApplication() {

	//variables;
	var applicationId;

	this.getId = function() {

		return applicationId;
	},

	this.setId = function(val) {

		applicationId = val;
	},



	this.create = function(req, res, callback) {

		var _me = this;

		var connection = new sql.Connection(database, function(err) {

			var ps = new sql.PreparedStatement(connection);

			ps.input('requestedLoanAmount', sql.Float);
			ps.input('requestedLoanTerm', sql.VarChar);
			ps.input('businessLoanPurpose', sql.VarChar);

			//create the SBApplication first;
			ps.prepare(" insert into SBApplication " +
				" ( requestedLoanAmount, requestedLoanTerm, loanPurpose ) Output Inserted.id " +
				" values " +
				" ( @requestedLoanAmount, @requestedLoanTerm, @businessLoanPurpose ) ",

				function(err) {

					if (err) {
						console.log('Error : ', err);
						callback(err, null);
					} else {

						ps.execute({
								requestedLoanAmount: req.body.desiredLoanAmount,
								requestedLoanTerm: req.body.loanTerm,
								businessLoanPurpose: req.body.businessLoanPurpose

							},

							/**
							 * If there are no errors, proceed with creating the business applicant;
							 *
							 * @param  {[type]} err       [description]
							 * @param  {[type]} recordset [description]
							 * @return {[type]}           [description]
							 */
							function(err, recordset) {

								if (err) {
									callback(err, null);

								} else {

									//ok, create the SBApplication ok. Now lets
									//create the business application record;
									applicationId = recordset[0].id;


									var aBusinessApplicant = new BusinessApplicant();

									aBusinessApplicant.create(applicationId, req,

										function(err, businessApplicant) {

											console.log('Created Business Application ', businessApplicant.getId());

											objectData = {
												_callback: callback
											}

											//ok, create the credit union;
											var _creditUnion = new CreditUnion();
											_creditUnion.setSBApplicationId(applicationId);
											_creditUnion.create(req, objectData, function(err, objectData, aUnion) {

												console.log('Create Credit Union ', aUnion.getId());
												//finalize the callback
												objectData._callback(null, applicationId);

											});


										});



								}

								//connection.close();

								//release the statement
								ps.unprepare(function(err) {});

								//close the connection
								connection.close();
							});
					}

				});
		});

	},

	/**
	 * [destroy description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	this.destroy = function(data) {
		console.log('You want to destroy');
	},


	/**
	 * Return the Owners on this application;
	 */
	this.getOwners = function(callback) {

		var _me = this;
		console.log('callback is ', callback, '\n app id is ', _me.getId());
		var connection = new sql.Connection(database, function(err) {

			var request = new sql.Request(connection);

			request.query("select	o.id, o.SBApplicationId, o.firstName, o.lastName, o.email, " +
				" o.ownershipPercentage, o.creditScore,	o.dateOfBirth, o.annualIncome, " +
				" o.addressId, o.phoneNumber,o.cellNumber,o.socialInsuranceNumber, " +
				" a.line1, a.line2,a.city, a.provinceCode, a.postalCode " +
				" from	owner o, address a " +
				" where	o.SBApplicationId = " + _me.getId() +
				" and a.id = o.addressId ",

				function(err, recordset) {

					if (err) {
						console.log('Error : ', err);
					} else {
						console.log('found \n', recordset.length, ' records ');
					}


					connection.close();
					callback(err, recordset);
				});
		});


	},

	this.getApplications = function(callback) {

		var _me = this;
	
		var connection = new sql.Connection(database, function(err) {

			var request = new sql.Request(connection);

			request.query("select  sb.*, ba.registeredName " +
				" from	SBApplication sb, " +
				"		BusinessApplicant ba " +
				" where	ba.SBApplicationId = sb.id ",

				function(err, recordset) {

					if (err) {
						console.log('Error : ', err);
					} else {
						console.log('found \n', recordset.length, ' records ');
					}


					connection.close();
					callback(err, recordset);
				});
		});

	}


	//####################################################################################
	//private methods, do not call directly
	//####################################################################################


}