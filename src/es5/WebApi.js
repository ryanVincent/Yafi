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