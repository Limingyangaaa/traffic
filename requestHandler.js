var querystring=require('querystring');
var fs=require('fs');

function start(res, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
}

function upload(res, postData) {
  console.log("Request handler 'upload' was called.");
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("You've sent: ");
  res.end();
}

function login(res, postData) {
  console.log("Request handler 'login' was called.");
  

  res.writeHead(200, {"Content-Type": "application/json","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"});
  //var response='{message:"success",status:"200"}';
 // var str=JSON.stringify(response);
  var data=postData;
  var receivedData=JSON.stringify(data);
  var username=data.user_name//提取不出来username；
  var password=data.password;
  console.log('postData',data);
  console.log('receivedData',receivedData.user_name);
  console.log('user_name',data.user_name);

  var login_data={message:"success",status:"200",data:[{"user_name":"limingyang"},{"user_id":"123"}]};

 // login_res.data='{username:"dddd"}';
   var dataObj=JSON.stringify(login_data);

   console.log('dataObj',dataObj);
  res.write(dataObj);
  res.end();
}


function auth(res,postData){
  console.log("Request handler 'auth' was called.");
  res.writeHead(200, {"Content-Type": "application/json","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"});
  var auth_data={message:"success",status:"200",data:[{user_name:"limingyang"},{user_id:"123"},{rank:"456"},{agency:"789"}]};
   var dataObj=JSON.stringify(auth_data);
  res.write(dataObj);
  res.end();
}

function map(res,postData){
  console.log("Request handler 'map' was called.");
  res.writeHead(200, {"Content-Type": "application/json","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"});
  var map_data={message:"success",status:"200",data:"中科院"};
  var dataObj=JSON.stringify(map_data);
  res.write(dataObj);
  res.end();
}

function search(res,postData){
  console.log("Request handler 'search' was called.");
  res.writeHead(200, {"Content-Type": "application/json","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"});
  var data=postData;
  var receivedData=JSON.stringify(data);
  console.log('postData',receivedData);
  var search_data={message:"success",status:"200",data:"20170522111221130"};
  var dataObj=JSON.stringify(search_data);
  res.write(dataObj);
  res.end();
}

function list(res,postData){
  console.log("Request handler 'list' was called.");
  res.writeHead(200, {"Content-Type": "application/json","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"});
  var data=postData;
  var receivedData=JSON.stringify(data);
  console.log('postData',receivedData);
  var list_data=fs.readFileSync('data1.json');
  //console.log(list_data.toString());
  var dataObj=list_data.toString();
  res.write(dataObj);
  res.end();
}

function table(res,postData){
  console.log("Request handler 'table' was called.");
  res.writeHead(200, {"Content-Type": "application/json","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"});
  var data=postData;
  var receivedData=JSON.stringify(data);
  console.log('postData',receivedData);
 var table_data=fs.readFileSync('data2.json');
 var dataObj=table_data.toString();
  res.write(dataObj);
  res.end();
}

function detail(res,postData){
  console.log("Request handler 'detail' was called.");
  res.writeHead(200, {"Content-Type": "application/json","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"});
  var data=postData;
  var receivedData=JSON.stringify(data);
  console.log('postData',receivedData);
 var detail_data=fs.readFileSync('data3.json');
 var dataObj=detail_data.toString();
  res.write(dataObj);
  res.end();
}

function currpage(res,postData){
  console.log("Request handler 'table' currpage called.");
  res.writeHead(200, {"Content-Type": "application/json","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"});
  var data=postData;
  var receivedData=JSON.stringify(data);
  console.log('postData',receivedData);
 var current_data=fs.readFileSync('data4.json');
 var dataObj=current_data.toString();
  res.write(dataObj);
  res.end();
}


exports.start = start;
exports.upload = upload;
exports.login=login;
exports.auth=auth;
exports.map=map;
exports.search=search;
exports.list=list;
exports.table=table;
exports.detail=detail;
exports.currpage=currpage;