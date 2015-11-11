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