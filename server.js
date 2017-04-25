var http = require("http")
var connect = require("connect")
var express = require("express")
var app = connect();
// var index = require("./routes/index")
var path = require("path")
var fs = require("fs")

var Bing = require('node-bing-api')({ accKey: "a1377318ce3b497d9865f579c651671b" });

function onRequest(request, response) {
  if (request.url == "/"){
    response.writeHead(200, {"Context-Type": "text/plain"});
    fs.createReadStream("./index.html").pipe(response);
    response.end("welcome");
  }
  else if (request.url.substr(0, 8) == "/search/") {
    response.writeHead(200, {"Context-Type": "text/plain"})
    var searchquery = request.url.substr(8);
    
    var results;
    Bing.images(searchquery, {
  top: 1,   // Number of results (max 50) 
  skip: 0    // Skip first 3 result 
  }, function(error, res, body){
    console.log(body);
    // results = JSON.parse(body);
    response.end(JSON.parse(body));
  });
  // console.log(results);
  }
  else {
    response.writeHead(200, {"Context-Type": "text/plain"});
    response.end("Error 404 Page Not Found");
  }
}

var server = http.createServer(onRequest)
server.listen(8080);
console.log("running on 8080")

// var options = {
//   host: "api.cognitive.microsoft.com",
//   path: "/bing/v5.0/images/search?q=cats&count=10&offset=0&mkt=en-us&safeSearch=Moderate",
//   method: "GET",
//   // port: 80,
//   headers: {
//     "Ocp-Apim-Subscription-Key": "a1377318ce3b497d9865f579c651671b"
//   }
// };
// callback = function(response) {
//   var str = '';

//   //another chunk of data has been recieved, so append it to `str`
//   response.on('data', function (chunk) {
//     str += chunk;
//   });

//   //the whole response has been recieved, so we just print it out here
//   response.on('end', function () {
//     console.log(str);
//   });
// }
// var results = {
//   host: "api.cognitive.microsoft.com",
//   path: "/bing/v5.0/images/search?q=cats&count=10&offset=0&mkt=en-us&safeSearch=Moderate",
//   method: "GET",
//   // port: 80,
//   headers: {
//     "Ocp-Apim-Subscription-Key": "a1377318ce3b497d9865f579c651671b"
//   }
//   // 
// }

// var results = {
//   host: "apiv3.iucnredlist.org",
//   path: "/api/v3/version",
//   // port: 80,
//   method: "GET"
//   // Ocp-Apim-Subscription-Key: "a1377318ce3b497d9865f579c651671b"
// }

// http.request(results, function(res) {
//   var body = ''
//   res.on('data', function(chunk) {
//     body += chunk;
//   });
//   res.on('end', function(){
//     var price = JSON.parse(body);
//     console.log(price);
//   })
// }).end();

// http.request(results, callback).end();

// app.use(doFirst);
// app.use(doSecond);
// function doFirst(request, response, next) {
//   console.log("bacon"); 
//   next();
// }
// function doSecond(request, response, next) {
//   console.log("tuna"); 
// }

// function callback(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var info = JSON.parse(body);
//     console.log(info);
//     console.log('test');
//   }
//   else {
//     var info = JSON.parse(body);
//     console.log(info);
//     console.log('test');
//   }
// }
