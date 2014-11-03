var sql = require('mssql'); // microsoft sql driver
var database = require('../config/database');

//Public
module.exports = Address;


//Private
function Address() {

	//Variables
	var id;
	var address1, address2, city, provinceCode, postalCode;

	this.getId = function() {
		return id;
	},

	this.setId = function(anId) {
		id = anId;
	},

	this.getAddress1 = function() {
		return address1;
	},

	this.setAddress1 = function(line) {
		address1 = line;
	},

	this.getAddress2 = function() {
		return address2;
	},

	this.setAddress2 = function(line) {
		address2 = line;
	},

	this.getCity = function() {
		return city;
	},

	this.setCity = function(aCity) {
		city = aCity;
	},

	this.getProvinceCode = function() {
		return provinceCode;
	},

	this.setProvinceCode = function(aCode) {
		provinceCode = aCode;
	}
	this.getPostalCode = function() {
		return postalCode;
	},

	this.setPostalCode = function(aCode) {
		postalCode = aCode;
	},

	this.processRequestObject = function(req) {

		this.setAddress1(req.body.address1);
		this.setAddress2(req.body.address2);
		this.setCity(req.body.city);
		this.setPostalCode(req.body.postalCode);
		this.setProvinceCode(req.body.provinceCode);

	},



	/**
	 * This object data is always passed back in the callback;
	 *
	 * @param  {[type]}   req        [description]
	 * @param  {[type]}   objectData [description]
	 * @param  {Function} callback   [description]
	 * @return {[type]}              [description]
	 */
	this.create = function(req, objectData, callback) {

		this.processRequestObject(req);

		//holds a reference to this object;
		var _me = this;

		var connection = new sql.Connection(database, function(err) {

			var ps = new sql.PreparedStatement(connection);

			ps.input('line1', sql.VarChar);
			ps.input('line2', sql.VarChar);
			ps.input('city', sql.VarChar);
			ps.input('provinceCode', sql.VarChar);
			ps.input('postalCode', sql.VarChar);

			ps.prepare("insert into Address " +
				" ( line1, line2, city, provinceCode, postalCode )  " +
				" Output Inserted.id " +
				" values " +
				" ( @line1, @line2, @city, @provinceCode, @postalCode ) ",

				function(err) {

					if (err) {
						console.log('Error ', err);
						callback(err, objectData, null);
					} else {

						ps.execute({
								line1: _me.getAddress1(),
								line2: _me.getAddress2(),
								city: _me.getCity(),
								provinceCode: _me.getProvinceCode(),
								postalCode: _me.getPostalCode()
							},
							function(err, recordset) {

								if (err) {
									console.log('Error creating address ', err);
									callback(err, objectData, null);
								} else {

									_me.setId(recordset[0].id);

									//return the address object;
									callback(null, objectData, _me);


								}

							})

					}

					//release the statement
					ps.unprepare(function(err) {});

					//close the connection
					connection.close();
				});

		});

	}
}