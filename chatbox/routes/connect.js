var express = require('express');
var router = express.Router();
var users = require('user2session');
/* GET home page. */

router.get('/', function(req, res, next) {
	
	//console.log(req.cookies);
	if (req.session.user) {
		return next();
	}
	else {
		res.redirect('login');
	}
});

module.exports = router;
