var app = {};

app.dispatcher = new Dispatcher();

app.newItemFormSubmit = function(){
  var text = document.getElementById("newTodoItem").value;

  var action = new Action({text: text, complete: false});
  action.origin = "USER";
  action.type = "ADD_ITEM";

  app.dispatcher.dispatch(action);

  return false;
}
