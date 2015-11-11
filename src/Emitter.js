"use strict";

class Emitter{

  constructor(){
    this._listeners = {};
  }

  emit(type){
    for(var token in this._listeners[type]){
      this._listeners[type][token]();
    }
  }

  on(type, callback){
    if(!this._listeners.hasOwnProperty(type)){
      this._listeners[type] = {};
    }
    var token = utils.guid();
    this._listeners[type][token] = callback;
    return token;
  }

  off(type, token){
    this._listeners[type][token];
  }

}
