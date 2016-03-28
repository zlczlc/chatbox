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
		res.redirect('login');
	}
});
router.get('/userdata', function(req, res, next) {
	console.log('send paras');
	//res.render('index', {username : 'aaaaa'});
	var username = req.session.user.username;
	DAO.friend.getList(username, function(err, friendList) {
		if (err) {
			res.send('error');
			return;
		}
		DAO.friend.getReqs(username, function(err, reqList) {
			if (err) {
				res.send('error');
				return;
			}
			DAO.message.getByUser(null, username, function(err, messageList) {
				if (err) {
					res.send('error');
					return;
				}
				var data = {
					user : req.session.user,
					reqList : reqList,
					friendList : friendList,
					messageList : messageList
				};
				res.json(data);
			});

		}); 
	}); 
	

	
});



module.exports = router;
