//import * as utils form 'Utils';
"use strict";

class Dispatcher{

  constructor(){
    this.callbacks = {};
    this._isDispatching = false;
    this._action = {};
  }

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param payload {Object} the data being sent to all registered callbacks.
   * @returns void
   */
  dispatch(action){
    if(this._isDispatching){
      throw "Cannot call Dispatcher.dispatch while it is currently dispatching.";
    };
    this._startDispatch(action);
    for( var token in this.callbacks){
      if(this.callbacks.hasOwnProperty(token)){
        this._invokeCallback(token);
      }
    }
    this._isDispatching = false;
  }

  /**
   * returns true if the dispatcher is currently in the process of dispatching events.
   *
   * @param
   * @returns {Boolean} true if currently dispatching.
   */
  isDispatching(){
    return this._isDispatching;
  }

  /**
   * Registers a callback which is invoked everytime a payload is dispatched.
   *
   * @param callback {Function} the function to be executed.
   * @returns token {String} a token representing the callback.
   */
  register(callback){
      var token = utils.guid();
      var callbackContainer = {
        callback: callback,
        isPending: false,
        isProcessed: false
      };
      this.callbacks[token] = callbackContainer;
      return token;
  }

  /**
   * Unregisters a callback
   *
   * @param token (String) the token associated with the callback you wish to unregister.
   * @returns void
   */
  unregister(token){
    delete this.callbacks[token];
  }

  /**
   * Wait for a a set of calbacks to be completed before continuing.
   *
   * @param ids {String[]} array of tokens identifying the callbacks to wait for.
   * @returns
   */
  waitFor(tokens){
    for(var i = 0; i < tokens.length; i++){
      var token = tokens[i];
      var callbackContainer = this.callbacks[token];
      if(callbackContainer.isPending){
        throw "Circular reference detected: does your token list include the callback it is called from?";
      };
      if(callbackContainer.isHandled){
        continue; // callback has already been processed so we don't want to call it again.
      }
      this._invokeCallback(token);
    }
  }

  _invokeCallback(token){
    var callbackContainer = this.callbacks[token];
    callbackContainer.isPending = true;
    callbackContainer.callback(this._action);
    callbackContainer.isHandled = true;

  }

  _startDispatch(action){
    this._action = action;
    for( var token in this.callbacks){
      if(this.callbacks.hasOwnProperty(token)){
        var callbackContainer = this.callbacks[token];
        callbackContainer.isPending = false;
        callbackContainer.isHandled = false;
      }
    }
    this._isDispatching = true;
  }

  _finishDispatch(){
    delete this._action;
    this._isDispatching = false;
  }


}
