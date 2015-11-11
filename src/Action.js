"use strict";

class Action{
  constructor(payload){
    this.origin = UNKNOWN;
    this.type = STANDARD_ACTION;
    this.payload = payload;
    this.error = false;
  }
}
