var request = require('request'), 
		jsdom = require('jsdom'), 
		sys = require('sys'), 
		http = require('http'),
		$ = require('jquery');
		
var url = 'http://www.makro.be/Content/assortiment/benzinestation/benzineprijzen/1/index.jsp?stat=';

http.createServer(function (req, res) {
	
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello Node.js\n');

  request({uri: url}, function (error, response, body) {
		console.log(body);
	});

}).listen(8124);
