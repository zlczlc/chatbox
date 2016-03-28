var express = require('express');
var router = express.Router();
var DAO = require('DAO');
var userSet = require('userSet');
//var sessionStore = require('../app').sessionStore;
/* GET users listing. */

router.get('/', function(req, res, next) {
  	if (!req.session.user) {
		res.render('login', {msg:''});
		return;
	}
	else {
		res.redirect('/');
		return;
	}
  	
});
//login 
router.post('/', function(req, res, next) {
	if (req.session.user) {
		userSet.remove(username);
		console.log('remove old user with this session');
	}
	var username = req.body.username;
	var password = req.body.password;
	if (!username) {
		res.render('login', {msg:'there should be a username'});
		return;
	}
	if (!password) {
		res.render('login', {msg:'there should be a password'});
		return;
	}
	console.log(username);
	console.log(password);
	var user = {username : username, password : password};
	console.log(user.username);
	DAO.user.check(user, function(err, result) {
		if (err) {
			res.render('login', {msg:'some thing wrong!'});
			return;
		}
		if (result == 0) {
			res.render('login', {msg:'wrong username'});
		}
		else if (result == 2) {
			res.render('login', {msg:'wrong password'});
		}
		else if (result == 1) {
			req.session.regenerate(function(err) {
				if (err) {
					console.log(err);
					res.render('login', {msg:'some thing wrong!'});
					return;
				}
				user.password = undefined;
				user.sessionId = req.session.id;
				req.session.user = user;
				userSet.set(user.username, user);
				res.redirect('/');
			});	
		}
		else {
			res.render('login', {msg:'some thing wrong!'});
		}
	});

});
// register
router.post('/signup', function(req, res, next) {
	if (req.session.user) {
		userSet.remove(username);
		console.log('remove old user with this session');
	}
	var username = req.body.username;
	var password = req.body.password;
	if (!username) {
		res.render('login', {msg:'there should be a username'});
		return;
	}
	if (!password) {
		res.render('login', {msg:'wrong password'});
		return;
	}
	console.log(username);
	console.log(password);
	var user = {username : username, password : password};
	console.log(user.username);
	DAO.user.addNew(user, function(err, result) {
		if (err) {
			res.render('login', {msg:'some thing wrong!'});
			return;
		}
		if (result == 0) {
			res.render('login', {msg:'some one else got this name'});
			return;
		}
		else {
			req.session.regenerate(function(err) {
				if (err) {
					console.log(err);
					res.render('login', {msg:'some thing wrong!'});
					return;
				}
				user.password = undefined;
				user.sessionId = req.session.id;
				req.session.user = user;
				userSet.set(user.username, user);
				res.redirect('/');
			});	
			
		}
	});
});

router.get('/logout', function(req, res, next) { 
	var username = req.session.user.username;
	userSet.remove(username);
	req.session.regenerate(function(err) {
		if (err) {
			console.log(err);	
		}
		res.redirect('login');
	});
});

module.exports = router;