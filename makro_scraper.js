var request = require('request'),
		http = require('http'),
		$ = require('jquery');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  res.write('a<?xml version="1.0" encoding="UTF-8"?>\n');
	res.write('a<fuels>\n');
	
	var fuels = get_prices();

	for(var j = 0; j < fuels.length; j++)
		res.write(fuels[j]);
	
	res.end('a</fuels>\n');
}).listen(8124);

function get_prices() {
	console.log('get_prices');
	
	var fuels = [];
	var fuel_types = ['diesel', 'eurosuper', 'superplus'];
	var i = 0;
	
	request({uri: 'http://www.makro.be/Content/assortiment/benzinestation/benzineprijzen/1/index.jsp?stat='}, function (error, response, body) {
		console.log('get_prices :: request');
		$(body).find('div.boxContent table[width="337"]').each(function() { 
			console.log('get_prices :: table');
			fuels[i] = ('<' + fuel_types[i] + '>' + $(this).find('tr:first-child').next().find('td:last').html() + '</' + fuel_types[i] + '>\n'); 
			console.log('get_prices :: ' + fuel_types[i]);
			i++;
		});
	});
	console.log(fuels);
	return fuels;
}
