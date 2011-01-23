var request = require('request'),
		jsdom = require('jsdom'), 
		sys = require('sys'),
		http = require('http'),
		$ = require('jquery');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  res.write('a<?xml version="1.0" encoding="UTF-8"?>\n');
	res.write('a<fuels>\n');
	
	var fuel_types = ['diesel', 'eurosuper', 'superplus'];
	var fuels = [];
	var i = 0;
	
  request({uri: 'http://www.makro.be/Content/assortiment/benzinestation/benzineprijzen/1/index.jsp?stat='}, function (error, response, body) {
		console.log(fuels);
		$(body).find('div.boxContent table[width="337"]').each(function() { 
			console.log('table');
			
			fuels.push('<' + fuel_types[i] + '>' + $(this).find('tr:first-child').next().find('td:last').html() + '</' + fuel_types[i] + '>\n'); 
			
			res.write('' + i);
			i++;
			res.write('-');
			res.end();
			console.log('/table');
		});
		
		res.write('test');
	});
	res.write('test2');
	console.log(fuels);
	console.log(fuels[0]);
	console.log(fuels[1]);
	
	for(var j = 0; j < fuels.length; j++)
		res.write(fuels[j]);
	
	res.end('a</fuels>\n');
}).listen(8124);
