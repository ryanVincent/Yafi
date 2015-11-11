"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function Action(payload) {
  _classCallCheck(this, Action);

  this.origin = 'unknown';
  this.type = 'default';
  this.payload = payload;
  this.error = false;
};