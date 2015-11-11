  'use strict';

class WebAPI{

  constructor(root, dispatcher){
    this._root = root;
    this._dispatcher = dispatcher;
    this.services = {};
    this._listeners = {};
    var self = this;
    this._dispatcherToken = this._dispatcher.register(function(action){
        self._onDispatch(action);
    });
  }
  _onDispatch(action){
    for(var token in this._listeners){
      this._listeners[token].call(this,action);
    }
  }

  addService(key, service){
    this.services[key] = service;
  }

  addDispatchListener(callback){
    var token = utils.guid();
    this._listeners[token] = callback;
  }

  removeDispatchListener(token){
    delete this._listeners[token];
  }

}
