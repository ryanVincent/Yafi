"use strict";
class ServerAction extends Action{
  cosntructor(payload){
    super(payload);
    this.origin = SERVER;
  }
}
