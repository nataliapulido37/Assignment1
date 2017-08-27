var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080,
    listings = '/listings';

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if (parsedUrl.pathname === listings)
  {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(listingData);
  }
  else{
    response.writeHead(404);
    response.end( 'Bad gateway error');
  }
};

//a server is created, but not started
server = http.createServer(requestHandler);
fs.readFile('listings.json', 'utf8', function(err, data) {
  //listingData = JSON.parse(data);
  listingData = data;
  server.listen(port, function() {});
});
