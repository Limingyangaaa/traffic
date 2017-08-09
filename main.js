var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandler");

var handle = {};
handle["/login"]=requestHandlers.login;
handle["/auth"]=requestHandlers.auth;
handle["/map"]=requestHandlers.map;
handle["/search"]=requestHandlers.search;
handle["/list"]=requestHandlers.list;
handle["/table"]=requestHandlers.table;
handle["/currpage"]=requestHandlers.currpage;
handle["/detail"]=requestHandlers.detail;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);