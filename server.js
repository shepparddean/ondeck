// server.js

// set up ======================================================================
// get all the tools we need
var express      = require('express');
var app          = express();
var port         = process.env.PORT || 8082;
var flash        = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB     = require('./config/database.js');

// configuration ===============================================================

// set up our express application
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json


// routes ======================================================================
//load the routes
require('./routes/applications')(app);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);