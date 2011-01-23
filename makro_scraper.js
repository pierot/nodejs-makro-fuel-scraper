var request = require('request'),
		http = require('http'),
		$ = require('jquery');
		
var http_response = '-';
var fuel_types = ['diesel', 'eurosuper', 'superplus'];
var i = 0;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/xml'});

  res.write('<?xml version="1.0" encoding="UTF-8"?>\n');
	res.write('<fuels>\n');
	

	i = 0;
	
	request({uri: 'http://www.makro.be/Content/assortiment/benzinestation/benzineprijzen/1/index.jsp?stat='}, function (error, response, body) {
		$(body).find('div.boxContent table[width="337"]').each(function() { 
			http_response = http_response + '<' + fuel_types[i] + '>' + $(this).find('tr:first-child').next().find('td:last').html() + '</' + fuel_types[i] + '>\n'; 

			i++;
		});
	});
	
	res.write(http_response);
	res.end('</fuels>\n');
}).listen(8124);