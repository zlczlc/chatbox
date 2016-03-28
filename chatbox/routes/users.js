var express = require('express');
var router = express.Router();
var DAO = require('../node_modules/DAO');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.send('respond with a resource');
});

var user = {name : 'test2', password : 'aaa'};

router.get('/addNew', function(req, res, next) {
  	DAO.addUser(user, function(rst) {
  		if (rst == -1) {
  			res.send('addOne error');
  		}
  		else if (rst == 0) {
  			res.send('username exists');
  		}	
  		else {
  			res.send('user added');
  		}

  		
  	});
	

});

module.exports = router;
