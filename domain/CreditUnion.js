var sql = require('mssql'); // microsoft sql driver
var database = require('../config/database');

//Public
module.exports = CreditUnion;


//Private
function CreditUnion() {

	//Variables
	var id;
	var SBApplicationId, addressId, name, branch, contactName, contactPhone;

	this.getId = function() {
		return id;
	},

	this.setId = function(anId) {
		id = anId;
	},


	this.getSBApplicationId = function() {
		return SBApplicationId;
	}
	this.setSBApplicationId = function(val) {
		SBApplicationId = val;
	}

	this.getAddressId = function() {
		return addressId;
	}
	this.setAddressId = function(val) {
		addressId = val;
	}

	this.getName = function() {
		return name;
	}
	this.setName = function(val) {
		name = val;
	}

	this.getBranch = function() {
		return branch;
	}
	this.setBranch = function(val) {
		branch = val;
	}

	this.getContactName = function() {
		return contactName;
	}
	this.setContactName = function(val) {
		contactName = val;
	}

	this.getContactPhone = function() {
		return contactPhone;
	}
	this.setContactPhone = function(val) {
		contactPhone = val;
	}




	this.processRequestObject = function(req) {

		this.setName(req.body.creditUnionName);
		this.setBranch(req.body.branchName);


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

			ps.input('SBApplicationId', sql.Int);
			ps.input('name', sql.VarChar);
			ps.input('branch', sql.VarChar);

			ps.prepare("insert into CreditUnion " +
				" ( SBApplicationId, name, branch )  " +
				" Output Inserted.id " +
				" values " +
				" ( @SBApplicationId, @name, @branch ) ",

				function(err) {

					if (err) {
						console.log('Error ', err);
						callback(err, objectData, null);
					} else {

						ps.execute({
								SBApplicationId: _me.getSBApplicationId(),
								name: _me.getName(),
								branch: _me.getBranch()
							},
							function(err, recordset) {

								if (err) {
									console.log('Error creating credit union ', err);
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