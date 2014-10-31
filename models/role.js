var mongoose = require('mongoose');

var roleSchema = mongoose.Schema({
	
	name: String,
	description: String,
	code: String,
	numberOfUsers: Number
});

module.exports = mongoose.model('Role', roleSchema);
