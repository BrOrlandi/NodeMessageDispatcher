var MessageDispatcher = require("./MessageDispatcher");
MessageDispatcher.initialize("serverTest");

var MD = new MessageDispatcher.MessageDispatcher("modulo1");

var someData = {a : "lalal", b: 50, c: "zzzzz"};
console.log("Start");

MD.listen("getSomeData",function(request){
	console.log("getSomeData From: "+request.dispatcher);
	return someData;
});

MD.listen("postNewData",function(request){
	someData[request.data.key] = request.data.val;
});

MD.request("postNewData",{key: "chave", val: "valor"}).then(function(result){
	console.log("Posted!");
});

MD.request("getSomeData").then(function(data){
	console.log("Some data: ");
	console.log(data);
});

var x = require("./otherModule");