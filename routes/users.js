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
	app.get('/api/users', function(req, res) {

		User.find(function(err, users) {
			if (err) {
				res.send(err);
			}


			res.json(users);
		});
	});



	/**
	 * Deletes a user from the system.
	 * 
	 * @param  {[type]} req  [description]
	 * @param  {[type]} res) {			User.remove({				_id: req.params.user_id			}, function(err, user) {				if (err)					res.send(err);				User.find(function(err, users) {					if (err)						res.send(err)					res.json(users);				});			});		} [description]
	 * @return {[type]}      [description]
	 */
	app.delete('/api/user/:user_id',
		function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err)
					res.send(err);

				User.find(function(err, users) {
					if (err)
						res.send(err)

					res.json(users);

				});
			});
		});



	/**
	 * This will associated the specified user to the specific role;
	 *
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	app.put('/api/users/:user_id/role/:role_id', function(req, res) {

		console.log('Looking for the user');
		//does the user already have the role?
		User.findOne({
				'_id': req.params.user_id,
				'roles': req.params.role_id
			},
			function(err, user) {

				if (!user) {
					console.log('The user does not have the role, adding it');

					User.findById(req.params.user_id,

						function(err, user) {
							user.roles.push(req.params.role_id);
							user.save();

						});

				}
			});




		res.json("{success: true, message: 'Role has been added'");

	});

}