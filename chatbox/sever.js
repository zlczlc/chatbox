var express =  require('express');                                                                     
var app = express();                                                                                 
app.get('/', function(req, res){                                                                     
    res.send('Hello World');                                                                         
});                                                                                                  
var server = app.listen(8808, function() {                                                           
    console.log('Listening on port %d', server.address().port);                                      
});
app.get('/sayhi', function(req, res){                                                                                                                                      
 　　res.send('狗狗 黑喂狗');                                                                         
});