// app/routes.js
module.exports = function(app, passport) {


	// process the signup form
	app.post('/api/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));



	app.get('/api/loginFailure', function(req, res) {
		res.status(401).json({
			message: 'Login Failed',
			success: true
		});
	});

	app.get('/api/loginSuccess', function(req, res) {
		res.status(200).json({
			message: 'Welcome!',
			success: true
		});
	});


	// process the login form
	app.post('/api/login', passport.authenticate('local-login', {
		successRedirect: '/api/loginSuccess',
		failureRedirect: '/api/loginFailure'
	}));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}