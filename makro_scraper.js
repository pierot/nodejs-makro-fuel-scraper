var request = require('request'), http = require('http'), $ = require('jquery');

http.createServer(function (req, res) {
	console.log(querystring.parse(req.url));
	request({uri: 'http://www.makro.be/Content/assortiment/benzinestation/benzineprijzen/1/index.jsp?stat='}, function (error, response, body) {
		res.writeHead(200, {'Content-Type': 'text/xml'});

		var fuel_types = ['diesel', 'eurosuper', 'superplus'];

		res.write('<?xml version="1.0" encoding="UTF-8"?>\n');
		res.write('<fuels>\n');
		
		$(body).find('div.boxContent table[width="337"]').each(function(index, element) { 
			res.write('<' + fuel_types[index] + '>' + $(element).find('tr:first-child').next().find('td:last').html() + '</' + fuel_types[index] + '>\n'); 
		});
		
		res.end('</fuels>\n');
	});
}).listen(8124);