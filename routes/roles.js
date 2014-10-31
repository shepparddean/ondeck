var Role = require('../models/role');
var User = require('../models/user');

module.exports = function(app) {


	/**
	 * Returns all roles within the system.
	 *
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/roles', function(req, res) {

		// //Ok, just find all the users with a role
		// User.find({
		// 		roles: '5449285e24cd15743bf4e3cb'
		// 	},

		// 	function(err, users) {
		// 		if (err) {
		// 			console.log(err);

		// 		}
		
		// 			//Ok, just find all the users with a role
		// 			console.log('I found ' , users ? users.length : 0, ' users');

		// 	}

			//Ok, add a role to the user;
			// user.roles.push('5446abdc9f3af3bc6f173e95');
			// user.save(function(err, obj) {
			// 	console.log('User Saved ' , err);
			// 	console.log('User Saved Obj ', obj);
			// })
			//console.log(user);

		// );
		//aUser.select('local.email');


		Role.find(function(err, roles) {
			if (err) {
				res.send(err);
			}

	

			res.json(roles);
		});
	});


	/**
	 * Create a new role in the system.
	 *
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.post('/api/role', function(req, res) {

		Role.create({
			name: req.body.name,
			code: req.body.code,
			description: req.body.description
		}, function(err, role) {
			if (err) {
				res.send(err);
			}

			res.json("{success: true, message: 'Role has been created', id: " + role._id + "}");
		});
	});


	app.delete('/api/roles/:id', function(req, res) {

		Role.remove({
			_id: req.params.id
		}, function(err, role) {
			if (err) {
				res.send(err);
			}

			res.json("{success: true, message: 'Role has been deleted', id: " + req.params.id + "}")
		});
	});




}