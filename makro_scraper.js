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
		$(body).find('div.boxContent table[width="337"]').each(function() { 
			console.log($(this));
			
			console.log($(this).find('tr:first-child').next());
			 
			console.log($(this).find('tr:first-child').next().find('td:last').html()); 
		});
	});
	
	res.end('Done!');

}).listen(8124);
