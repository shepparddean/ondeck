var mongoose = require('mongoose');

var companySchema = mongoose.Schema({

	name: String,
	address: {

		streetNumber: String,
		streetName: String,
		streetDirection: String,
		StreetType: String,
		city: String,
		postalCode: String,
		province: String
	},
	description: String
});

module.exports = mongoose.model('Company', companySchema);