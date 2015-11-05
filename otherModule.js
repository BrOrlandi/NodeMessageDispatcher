var MessageDispatcher = require("./MessageDispatcher");

var MD = new MessageDispatcher.MessageDispatcher("modulo2");

MD.request("postNewData",{key: "FROM_OTHER", val: 666.666}).then(function(result){
	console.log("Posted 666");
});

MD.request("getSomeData").then(function(data){
	console.log("FROM_OTHER: "+ data.FROM_OTHER);
});