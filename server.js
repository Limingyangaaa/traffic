var http=require('http');
var url=require('url');
var querystring=require('querystring');

function start(route,handle){

  function onRequest(req,res){
    var postData1="";
    var postData="";
    res.setHeader("Access-Control-Allow-Origin", "*");
    var pathname=url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    req.setEncoding("utf8");
    req.addListener("data", function(postDataChunk) {
      postData1 += postDataChunk;
      postData = querystring.parse(postData1);
      console.log("Received POST data chunk '"+postDataChunk + "'.");
    });
    req.addListener("end",function(){
      route(handle,pathname,res,postData);
    })
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start=start;