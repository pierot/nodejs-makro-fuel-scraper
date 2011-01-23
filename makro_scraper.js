var request = require('request'), 
		jsdom = require('jsdom'), 
		sys = require('sys'), 
		http = require('http'),
		$ = require('jquery');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/xml'});

  res.write('<?xml version="1.0" encoding="UTF-8"?>\n');
	res.write('<fuels>\n');
	
	var fuel_types = ['diesel', 'eurosuper', 'superplus'];
	var fuels = [];
	var i = 0;
	
  request({uri: 'http://www.makro.be/Content/assortiment/benzinestation/benzineprijzen/1/index.jsp?stat='}, function (error, response, body) {
		$(body).find('div.boxContent table[width="337"]').each(function() { 
			fuels.push('<' + fuel_types[i] + '>' + $(this).find('tr:first-child').next().find('td:last').html() + '</' + fuel_types[i] + '>\n'); 
			
			i++;
		});
	});
	
	console.log(fuels[0]);
	
	for(var j = 0; j < fuels.length; j++)
		res.write(fuels[j]);
	
	res.end('</fuels>\n');
}).listen(8124);
