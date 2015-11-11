"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function Action(payload) {
  _classCallCheck(this, Action);

  this.origin = UNKNOWN;
  this.type = STANDARD_ACTION;
  this.payload = payload;
  this.error = false;
};
//import * as utils form 'Utils';
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

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

  _createClass(Dispatcher, [{
    key: "dispatch",
    value: function dispatch(action) {
      if (this._isDispatching) {
        throw "Cannot call Dispatcher.dispatch while it is currently dispatching.";
      };
      this._startDispatch(action);
      for (var token in this.callbacks) {
        if (this.callbacks.hasOwnProperty(token)) {
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

  }, {
    key: "isDispatching",
    value: function isDispatching() {
      return this._isDispatching;
    }

    /**
     * Registers a callback which is invoked everytime a payload is dispatched.
     *
     * @param callback {Function} the function to be executed.
     * @returns token {String} a token representing the callback.
     */

  }, {
    key: "register",
    value: function register(callback) {
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

  }, {
    key: "unregister",
    value: function unregister(token) {
      delete this.callbacks[token];
    }

    /**
     * Wait for a a set of calbacks to be completed before continuing.
     *
     * @param ids {String[]} array of tokens identifying the callbacks to wait for.
     * @returns
     */

  }, {
    key: "waitFor",
    value: function waitFor(tokens) {
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var callbackContainer = this.callbacks[token];
        if (callbackContainer.isPending) {
          throw "Circular reference detected: does your token list include the callback it is called from?";
        };
        if (callbackContainer.isHandled) {
          continue; // callback has already been processed so we don't want to call it again.
        }
        this._invokeCallback(token);
      }
    }
  }, {
    key: "_invokeCallback",
    value: function _invokeCallback(token) {
      var callbackContainer = this.callbacks[token];
      callbackContainer.isPending = true;
      callbackContainer.callback(this._action);
      callbackContainer.isHandled = true;
    }
  }, {
    key: "_startDispatch",
    value: function _startDispatch(action) {
      this._action = action;
      for (var token in this.callbacks) {
        if (this.callbacks.hasOwnProperty(token)) {
          var callbackContainer = this.callbacks[token];
          callbackContainer.isPending = false;
          callbackContainer.isHandled = false;
        }
      }
      this._isDispatching = true;
    }
  }, {
    key: "_finishDispatch",
    value: function _finishDispatch() {
      delete this._action;
      this._isDispatching = false;
    }
  }]);

  return Dispatcher;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Emitter = (function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this._listeners = {};
  }

  _createClass(Emitter, [{
    key: "emit",
    value: function emit(type) {
      for (var token in this._listeners[type]) {
        this._listeners[type][token]();
      }
    }
  }, {
    key: "on",
    value: function on(type, callback) {
      if (!this._listeners.hasOwnProperty(type)) {
        this._listeners[type] = {};
      }
      var token = utils.guid();
      this._listeners[type][token] = callback;
      return token;
    }
  }, {
    key: "off",
    value: function off(type, token) {
      this._listeners[type][token];
    }
  }]);

  return Emitter;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = (function () {
  function Store(dispatcher, emitter) {
    _classCallCheck(this, Store);

    this._dispatcher = dispatcher;
    this._emitter = emitter || new Emitter();
    this._listeners = {};
    var self = this;
    this._dispatcherToken = this._dispatcher.register(function (action) {
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

  _createClass(Store, [{
    key: "_onDispatch",
    value: function _onDispatch(action) {
      for (var token in this._listeners) {
        this._listeners[token].call(this, action);
      }
    }

    /**
     * Sets the initial state of the Store and broadcasts this change via emit('change').
     *
     * @param state {object} The initial state of the store.
     * @returns {void}
     */

  }, {
    key: "setInitialState",
    value: function setInitialState(state) {
      this._state = state;
      this.emit('change');
    }

    /**
     * Returns the current state of the Store.
     *
     * @returns {Object} current state of the store.
     */

  }, {
    key: "getState",
    value: function getState() {
      return this._state;
    }

    /**
     * Use this method to update the internal state of the Store. Should only be called from within a callback registered by addDispatchListener.
     *
     * @param state {Object}
     * @returns void
     */

  }, {
    key: "setState",
    value: function setState(state) {
      utils.deepExtend(this._state, state);
    }

    /**
     * Lets any view that is listening know that a change has occured in this store.
     *
     * @param {String} type: the type of change that has occured.
     * @returns void
     */

  }, {
    key: "emit",
    value: function emit(type) {
      this._emitter.emit(type);
    }

    /**
     * Used by views to listen for updates to the Store via it's emitter.
     *
     * @param type {string} type of message being emitted. It is recommended to only use one type of emit event normally labelled 'change'.
     * @returns void
     */

  }, {
    key: "on",
    value: function on(type, callback) {
      this._emitter.on(type, callback);
    }

    /**
     * Used by view to unsubscribe from a Store's emitter.
     *
     * @param
     * @returns
     */

  }, {
    key: "off",
    value: function off(type, callback) {
      this._emitter.off(type, callback);
    }

    /**
     * Used to listen for actions coming from the dispatcher.
     *
     * @param type {String} the type of change emitted.
     * @returns token {String} token representing the callback
     */

  }, {
    key: "addDispatchListener",
    value: function addDispatchListener(callback) {
      var token = utils.guid();
      this._listeners[token] = callback;
    }

    /**
     * Used to remove a dispatchListener. This listener will no longer be invoked when the Dispatcher dispatches actions to the Store's.
     *
     * @param
     * @returns
     */

  }, {
    key: "removeDispatchListener",
    value: function removeDispatchListener(token) {
      delete this._listeners[token];
    }
  }, {
    key: "getDispatcherToken",
    value: function getDispatcherToken() {
      return this._dispatcherToken;
    }
  }]);

  return Store;
})();
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var utils = {
  guid: function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },
  deepExtend: (function (_deepExtend) {
    function deepExtend(_x) {
      return _deepExtend.apply(this, arguments);
    }

    deepExtend.toString = function () {
      return _deepExtend.toString();
    };

    return deepExtend;
  })(function (out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (!obj) continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (_typeof(obj[key]) === 'object') deepExtend(out[key], obj[key]);else out[key] = obj[key];
        }
      }
    }

    return out;
  })

};
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebAPI = (function () {
  function WebAPI(root, dispatcher) {
    _classCallCheck(this, WebAPI);

    this._root = root;
    this._dispatcher = dispatcher;
    this.services = {};
    this._listeners = {};
    var self = this;
    this._dispatcherToken = this._dispatcher.register(function (action) {
      self._onDispatch(action);
    });
  }

  _createClass(WebAPI, [{
    key: '_onDispatch',
    value: function _onDispatch(action) {
      for (var token in this._listeners) {
        this._listeners[token].call(this, action);
      }
    }
  }, {
    key: 'addService',
    value: function addService(key, service) {
      this.services[key] = service;
    }
  }, {
    key: 'addDispatchListener',
    value: function addDispatchListener(callback) {
      var token = utils.guid();
      this._listeners[token] = callback;
    }
  }, {
    key: 'removeDispatchListener',
    value: function removeDispatchListener(token) {
      delete this._listeners[token];
    }
  }]);

  return WebAPI;
})();