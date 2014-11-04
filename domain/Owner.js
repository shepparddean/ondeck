var sql = require('mssql'); // microsoft sql driver
var database = require('../config/database');
var Address = require('../domain/Address.js');


//Public
module.exports = Owner;


function Owner() {

	var id,
		SBApplicationId,
		firstName,
		lastName,
		email,
		percentage,
		cellPhone,
		annualIncome,
		creditScore,
		dateOfBirth,
		homePhone,
		sin,
		addressId;



	this.getId = function() {
		return id;
	}
	this.setId = function(val) {
		id = val;
	},

	this.getSBApplicationId = function() {
		return SBApplicationId;
	},

	this.setSBApplicationId = function(id) {
		SBApplicationId = id;
	},


	this.getFirstName = function() {
		return firstName;
	}
	this.setFirstName = function(val) {
		firstName = val;
	}

	this.getLastName = function() {
		return lastName;
	}
	this.setLastName = function(val) {
		lastName = val;
	}

	this.getEmail = function() {
		return email;
	}
	this.setEmail = function(val) {
		email = val;
	}

	this.getPercentage = function() {
		return percentage;
	}
	this.setPercentage = function(val) {
		percentage = val;
	}

	this.getCellPhone = function() {
		return cellPhone;
	}
	this.setCellPhone = function(val) {
		cellPhone = val;
	}

	this.getAnnualIncome = function() {
		return annualIncome;
	}
	this.setAnnualIncome = function(val) {
		annualIncome = val;
	}

	this.getCreditScore = function() {
		return creditScore;
	}
	this.setCreditScore = function(val) {
		creditScore = val;
	}

	this.getDateOfBirth = function() {
		console.log('returning ', dateOfBirth);
		return dateOfBirth;
	}
	this.setDateOfBirth = function(val) {
		dateOfBirth = new Date(val);
	}

	this.getHomePhone = function() {
		return homePhone;
	}
	this.setHomePhone = function(val) {
		homePhone = val;
	}

	this.getSin = function() {
		console.log('SIN Returning ', sin );
		return sin;
	}
	this.setSin = function(val) {
		sin = val;
	}

	this.getAddressId = function() {
		return addressId;
	}
	this.setAddressId = function(val) {
		addressId = val;
	},


	this.processRequestObject = function(req) {

		this.setFirstName(req.body.firstName);
		this.setLastName(req.body.lastName);
		this.setEmail(req.body.email);
		this.setPercentage(req.body.percentage);
		this.setCellPhone(req.body.cellPhone);
		this.setAnnualIncome(req.body.annualIncome);
		this.setCreditScore(req.body.creditScore);
		this.setDateOfBirth(req.body.dateOfBirth);
		this.setHomePhone(req.body.homePhone);
		this.setSin(req.body.sin);
	},


	this.create = function(SBApplicationId, req, callback) {

		this.setSBApplicationId(SBApplicationId);
		this.processRequestObject(req);

		//get a reference to the current scope, so it is available in the callback functions below;
		var _me = this;

		//create the address object first
		anAddress = new Address();

		//pass in some useful variables to call back;
		objectData = {
			_scope: _me,
			_callback: callback
		};

		//Create the address, the callback will then create the business applicant
		anAddress.create(req, objectData, this.createOwner);

	},


	/**
	 * Create the business applicant;
	 *
	 * @param  {[type]} err        [description]
	 * @param  {[type]} objectData [description]
	 * @param  {[type]} _address   [description]
	 * @return {[type]}            [description]
	 */
	this.createOwner = function(err, objectData, _address) {

		var _me = objectData._scope;
		var _callback = objectData._callback;

										console.log( _me.getSBApplicationId() );
										console.log( _me.getFirstName() );
										console.log( _me.getLastName() );
										console.log( _me.getEmail() );
										console.log( _me.getPercentage() );
										console.log( _me.getCreditScore() );
										console.log( _me.getDateOfBirth() );
										console.log(_me.getSin() );
										console.log( _me.getAnnualIncome() );
										console.log( _address.getId() );
										console.log( _me.getHomePhone() );
										console.log( _me.getCellPhone() );

		//ok, obtain a connection and then continue;
		var connection = new sql.Connection(database,

			function(err) {

				var ps = new sql.PreparedStatement(connection);

				// 	//define the attributes;
				ps.input('SBApplicationId', sql.Int);
				ps.input('firstName', sql.VarChar);
				ps.input('lastName', sql.VarChar);
				ps.input('email', sql.VarChar);
				ps.input('ownershipPercentage', sql.Float);
				ps.input('cellNumber', sql.VarChar);
				ps.input('phoneNumber', sql.VarChar);
				ps.input('annualIncome', sql.Float);
				ps.input('creditscore', sql.VarChar);
				ps.input('dateOfBirth', sql.Date);
				ps.input('socialInsuranceNumber', sql.VarChar);
				ps.input('addressId', sql.Int);


				ps.prepare(
					" insert into Owner ( " +
					" SBApplicationId, " +
					" firstName, " +
					" lastName, " + 
					" email, " + 
					" ownershipPercentage, " +
					"  creditscore, "+ 
					" dateOfBirth, " +
					"  socialInsuranceNumber, " + 
					" annualIncome," +
					" addressId, " + 
					" phoneNumber, " +
					"  cellNumber " +
					
					" )" +
					
					"  Output Inserted.id  " +

					"	values ( " +
					" @SBApplicationId, " + 
					" @firstName, " +
					" @lastName,  " +
					" @email, " +
					"  @ownershipPercentage, " +
					" @creditscore,  " + 
					" @dateOfBirth, " +
					" @socialInsuranceNumber, " +
					" @annualIncome, " + 
					" @addressId, " +
					" @phoneNumber, " +
					"  @cellNumber " +
					" )",

					function(err) {

						if (err) {
							console.log('Owner.create ', err);
							callback(err, null);
						} else {


										

							ps.execute({
										
										SBApplicationId			: _me.getSBApplicationId(),
										firstName				: _me.getFirstName(),
										lastName				: _me.getLastName(),
										email					: _me.getEmail(),
										ownershipPercentage		: _me.getPercentage(),
										creditscore				: _me.getCreditScore(),
										dateOfBirth				: _me.getDateOfBirth(),
										socialInsuranceNumber	: _me.getSin(),
										annualIncome			: _me.getAnnualIncome(),
										addressId				: _address.getId(),
										phoneNumber				: _me.getHomePhone(),
										cellNumber				: _me.getCellPhone()
									
								},
								function(err, recordset) {
									if (err) {
										console.log('Error : ', err);
										_callback(err, null);
									} else {

										_me.setId(recordset[0].id);
										console.log('Owner Created ', _me.getId());

										//return the business object;
										_callback(null, _me);

									}

									ps.unprepare(function(err) {});

									//close the connection
									connection.close();
								});


						}
					});
			});




	}


}