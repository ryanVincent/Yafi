var app = {};

app.dispatcher = new Dispatcher();

app.newItemFormSubmit = function(){
  var text = document.getElementById("newTodoItem");

  var action = new Action({text: text, complete: false});
  action.origin = "USER";
  action.type = "ADD_ITEM";

  dispatcher.dispatch(action);

  return false;
}
