"use strict";

class Action{
  constructor(payload){
    this.origin = 'unknown';
    this.type = 'default';
    this.payload = payload;
    this.error = false;
  }
}
