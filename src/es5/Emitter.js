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