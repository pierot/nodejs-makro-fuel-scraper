var request = require('request'), 
		jsdom = require('jsdom'), 
		sys = require('sys'), 
		http = require('http'),
		$ = require('jquery');
		
var url = 'http://www.makro.be/Content/assortiment/benzinestation/benzineprijzen/1/index.jsp?stat=';
var fuel_types = ['diesel', 'eurosuper', 'superplus'];
var i = 0;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/xml'});

  res.write('<?xml version="1.0" encoding="UTF-8"?>\n');
	res.write('<fuels>\n');
	
  request({uri: url}, function (error, response, body) {
		$(body).find('div.boxContent table[width="337"]').each(function() { 
			console.log($(this).find('tr:first-child').next().find('td:last').html()));
			
			res.write('<' + fuel_types[i] + '>' + $(this).find('tr:first-child').next().find('td:last').html() + '</' + fuel_types[i] + '>\n'); 
			
			i++;
		});
	});
	
	res.end('</fuels>\n');
}).listen(8124);
