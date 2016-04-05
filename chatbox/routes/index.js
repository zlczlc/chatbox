var express = require('express');
var router = express.Router();
var DAO = require('DAO');
//var users = require('user2session');
/* GET home page. */



router.get('/', function(req, res, next) {
	if (req.session.user) {
		res.render('index', {username : req.session.user.username});
	}
	else {
		res.redirect('/users');
	}
});




module.exports = router;
