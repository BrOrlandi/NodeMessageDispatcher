'use strict';

var _central;

var MessageDispatcher = class MessageDispatcher {

	constructor(name){
		this.name = name;
		this.listeners = {};
		this.central = _central;
		this.central.registerModule(this);
	}

	listen(name, func){
		this.listeners[name] = func;
		this.central.registerListener(name,this);
	}

	request(name, data){
		if(typeof data === "undefined"){
			data = {};
		}
		var dataToSend = {dispatcher: this.name, data :data};
		return this._request(name,dataToSend);
	}

	_request(name, data){
		if(this.listeners.hasOwnProperty(name)){
			var promise = new Promise((resolve,reject)=>{
				var result = this.listeners[name].apply(this, [data]);
				resolve(result);
			});
			return promise;
		}
		var dispatchToCenter = this.central.dispatchRequest(name, data);
		return dispatchToCenter;
	}

};

var MessageCenter = class MessageCenter{
	constructor(server){
		this.server = server;
		this.modules = {};
		this.listenersModules = {};
	}

	registerModule(module){
		console.log("new module: "+module.name);
		this.modules[module.name] = module;
	}

	registerListener(name, module){
		console.log("new listener: "+name);
		this.listenersModules[name] = module.name;
	}

	dispatchRequest(name, dataToSend){
		if(this.listenersModules.hasOwnProperty(name)){
			var module = this.modules[this.listenersModules[name]];
			return module._request(name,dataToSend);
		}
	}


};

module.exports = {
	initialize: function(server){
		_central = new MessageCenter(server);
	},
	MessageDispatcher: MessageDispatcher
};