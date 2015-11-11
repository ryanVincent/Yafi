"use strict";

class Store {

  constructor(dispatcher, emitter){
    this._dispatcher = dispatcher;
    this._emitter = emitter || new Emitter();
    this._listeners = {};
    var self = this;
    this._dispatcherToken = this._dispatcher.register(function(action){
        self._onDispatch(action);
    });
    this._state = {};
  }

  /**
   * Called when the dispatcher dispatches a new payload.
   *
   * @param
   * @returns
   */
  _onDispatch(action){
    for(var token in this._listeners){
        this._listeners[token].call(this,action);
    }
  }

  /**
   * Sets the initial state of the Store and broadcasts this change via emit('change').
   *
   * @param state {object} The initial state of the store.
   * @returns {void}
   */
  setInitialState(state){
    this._state = state;
    this.emit('change');
  }

  /**
   * Returns the current state of the Store.
   *
   * @returns {Object} current state of the store.
   */
  getState(){
    return this._state;
  }

  /**
   * Use this method to update the internal state of the Store. Should only be called from within a callback registered by addDispatchListener.
   *
   * @param state {Object}
   * @returns void
   */
  setState(state){
    utils.deepExtend(this._state, state);
  }

  /**
   * Lets any view that is listening know that a change has occured in this store.
   *
   * @param {String} type: the type of change that has occured.
   * @returns void
   */
  emit(type){
    this._emitter.emit(type);
  }

  /**
   * Used by views to listen for updates to the Store via it's emitter.
   *
   * @param type {string} type of message being emitted. It is recommended to only use one type of emit event normally labelled 'change'.
   * @returns void
   */
  on(type, callback){
    this._emitter.on(type, callback);
  }

  /**
   * Used by view to unsubscribe from a Store's emitter.
   *
   * @param
   * @returns
   */
  off(type, callback){
    this._emitter.off(type, callback);
  }

  /**
   * Used to listen for actions coming from the dispatcher.
   *
   * @param type {String} the type of change emitted.
   * @returns token {String} token representing the callback
   */
  addDispatchListener(callback){
    var token = utils.guid();
    this._listeners[token] = callback;
  }

  /**
   * Used to remove a dispatchListener. This listener will no longer be invoked when the Dispatcher dispatches actions to the Store's.
   *
   * @param
   * @returns
   */
  removeDispatchListener(token){
    delete this._listeners[token];
  }

  getDispatcherToken(){
    return this._dispatcherToken;
  }

}
