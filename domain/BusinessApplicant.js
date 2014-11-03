var sql = require('mssql'); // microsoft sql driver
var database = require('../config/database');
var Address = require('../domain/Address.js');
//Public
module.exports = BusinessApplicant;


//Private
function BusinessApplicant() {

	//variables;
	var id;
	var SBApplicationId;
	var annualRevenue;
	var landlordPhone;
	var landlordName;
	var creditCardBalance;
	var monthlyTransactions;
	var merchantCashAdvanceBalance;
	var averageBankBalance;
	var registeredName;
	var doingBusinessAs;
	var formOfBusiness;
	var description;
	var inceptionDate;
	var businessTaxNumber;
	var sicCode;
	var naiscCode;
	var addressId;
	var contactName;


	this.getId = function() {
		return id;
	},

	this.setId = function(_id) {
		id = _id;
	},

	this.getSBApplicationId = function() {
		return SBApplicationId;
	},

	this.setSBApplicationId = function(id) {
		SBApplicationId = id;
	},

	this.getAnnualRevenue = function() {
		return annualRevenue;
	},

	this.setAnnualRevenue = function(revenue) {
		annualRevenue = revenue;
	},

	this.getLandlordName = function() {
		return landlordName;
	},

	this.setLandlordName = function(name) {
		landlordName = name;
	},

	this.getLandlordPhone = function() {
		return landlordPhone;
	},

	this.setLandlordPhone = function(phone) {
		landlordPhone = phone;
	},

	this.getCreditCardBalance = function() {
		return creditCardBalance;
	},

	this.setCreditCardBalance = function(bal) {
		creditCardBalance = bal;
	},
	this.getMonthlyTransactions = function() {
		return monthlyTransactions;
	},
	this.setMonthlyTransactions = function(trans) {
		monthlyTransactions = trans;
	},
	this.getMerchantCashAdvanceBalance = function() {
		return merchantCashAdvanceBalance;
	},
	this.setMerchantCashAdvanceBalance = function(balance) {
		merchantCashAdvanceBalance = balance;
	},

	this.getAverageBankBalance = function() {
		return averageBankBalance;
	},

	this.setAverageBankBalance = function(balance) {
		averageBankBalance = balance;
	},

	this.getRegisteredName = function() {
		return registeredName;
	},

	this.setRegisteredName = function(name) {
		registeredName = name;
	},

	this.getDoingBusinessAs = function() {
		return doingBusinessAs;
	},

	this.setDoingBusinessAs = function(dba) {
		doingBusinessAs = dba;
	},

	this.getFormOfBusiness = function() {
		return formOfBusiness;
	},

	this.setformOfBusiness = function(form) {
		formOfBusiness = form;
	},

	this.getDescription = function() {
		return description;
	},

	this.setDescription = function(desc) {
		description = desc;
	},

	this.getInceptionDate = function() {
		return inceptionDate;
	},

	this.setInceptionDate = function(incDate) {
		console.log('Convert to date ', incDate);
		inceptionDate = incDate;
	},

	this.getBusinessTaxNumber = function() {
		return businessTaxNumber;
	},

	this.setBusinessTaxNumber = function(taxNumber) {
		businessTaxNumber = taxNumber;
	},

	this.getSicCode = function() {
		return sicCode;
	},

	this.setSicCode = function(code) {
		sicCode = code;
	},

	this.getNaiscCode = function() {
		return naiscCode;
	},

	this.setNaiscCode = function(code) {
		naiscCode = code;
	},
	this.getAddressId = function() {
		return addressId;
	},
	this.setAddressId = function(aId) {
		addressId = aId;
	},
	this.getContactName = function() {
		return contactName;
	},
	this.setContactName = function(name) {
		contactName = name;
	},

	this.processRequestObject = function(req) {

		//console.log('Business Tax ', req.body.businessTaxNumber);

		this.setAnnualRevenue(req.body.annualRevenue);
		this.setLandlordPhone(req.body.landlordPhone);
		this.setLandlordName(req.body.landlordName);
		this.setCreditCardBalance(req.body.creditCardBalance);
		this.setMonthlyTransactions(req.body.monthlyTransactions);
		this.setMerchantCashAdvanceBalance(req.body.mcaBalance);
		this.setAverageBankBalance(req.body.averageBankBalance);
		this.setRegisteredName(req.body.businessName);
		this.setDoingBusinessAs(req.body.doingBusinessAs);
		this.setformOfBusiness(req.body.formOfBusiness);
		this.setDescription(req.body.description);
		this.setInceptionDate(req.body.businessInceptionDate);
		this.setBusinessTaxNumber(req.body.businessTaxNumber);
		this.setSicCode(req.body.businessSicCode);
		this.setNaiscCode(req.body.businessNaicsCode);
		this.setContactName(req.body.businessContactName);

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
		anAddress.create(req, objectData, this.createBusinessApplicant);

	},


	/**
	 * Create the business applicant;
	 *
	 * @param  {[type]} err        [description]
	 * @param  {[type]} objectData [description]
	 * @param  {[type]} _address   [description]
	 * @return {[type]}            [description]
	 */
	this.createBusinessApplicant = function(err, objectData, _address) {

		var _me = objectData._scope;
		var _callback = objectData._callback;

		//ok, obtain a connection and then continue;
		var connection = new sql.Connection(database,

			function(err) {

				var ps = new sql.PreparedStatement(connection);

				// 	//define the attributes;
				ps.input('SBApplicationId', sql.Int);
				ps.input('annualRevenue', sql.Float);
				ps.input('landlordPhoneNumber', sql.VarChar);
				ps.input('landlordName', sql.VarChar);
				ps.input('creditCardBalance', sql.Float);
				ps.input('monthlyTransactions', sql.Int);
				ps.input('merchantCashAdvanceBalance', sql.Float);
				ps.input('averageBankBalance', sql.Float);
				ps.input('registeredName', sql.VarChar);
				ps.input('doingBusinessAs', sql.VarChar);
				ps.input('formOfBusiness', sql.VarChar);
				ps.input('description', sql.VarChar);
				ps.input('inceptionDate', sql.Date);
				ps.input('businessTaxNumber', sql.VarChar);
				ps.input('sicCode', sql.VarChar);
				ps.input('naiscCode', sql.VarChar);
				ps.input('addressId', sql.Int);
				ps.input('contactName', sql.VarChar);


				ps.prepare(
					" insert into BusinessApplicant (SBApplicationId, annualRevenue, landlordPhoneNumber," +
					"	landlordName, creditCardBalance, monthlyTransactions, merchantCashAdvanceBalance," +
					" averageBankBalance, registeredName, doingBusinessAs, description, formOfBusiness, " +
					"	inceptionDate, businessTaxNumber, sicCode, naiscCode, addressId, contactName )" +
					"  Output Inserted.id  " +
					"	values ( " +
					"	@SBApplicationId, @annualRevenue, @landlordPhoneNumber," +
					"	@landlordName, @creditCardBalance, @monthlyTransactions, @merchantCashAdvanceBalance," +
					"	@averageBankBalance, @registeredName, @doingBusinessAs, @description, @formOfBusiness, " +
					"	@inceptionDate, @businessTaxNumber, @sicCode, @naiscCode, @addressId, @contactName " +
					"	) ", function(err) {

						if (err) {
							console.log('BusinessApplicant.create ', err);
							callback(err, null);
						} else {


							ps.execute({

									SBApplicationId: SBApplicationId,
									annualRevenue: _me.getAnnualRevenue(),
									landlordPhoneNumber: _me.getLandlordPhone(),
									landlordName: _me.getLandlordName(),
									creditCardBalance: _me.getCreditCardBalance(),
									monthlyTransactions: _me.getMonthlyTransactions(),
									merchantCashAdvanceBalance: _me.getMerchantCashAdvanceBalance(),
									averageBankBalance: _me.getAverageBankBalance(),
									registeredName: _me.getRegisteredName(),
									doingBusinessAs: _me.getDoingBusinessAs(),
									description: _me.getDescription(),
									formOfBusiness: _me.getFormOfBusiness(),
									inceptionDate: _me.getInceptionDate(),
									businessTaxNumber: _me.getBusinessTaxNumber(),
									sicCode: _me.getSicCode(),
									naiscCode: _me.getNaiscCode(),
									addressId: _address.getId(),
									contactName: _me.getContactName()

								},
								function(err, recordset) {
									if (err) {
										console.log('Error : ', err);
										_callback(err, null);
									} else {

										_me.setId(recordset[0].id);
										console.log('Business Application Created ', _me.getId());

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