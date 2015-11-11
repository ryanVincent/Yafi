"use strict";
class ViewAction extends Action{
  cosntructor(payload){
    super(payload);
    this.origin = VIEW;
  }
}
