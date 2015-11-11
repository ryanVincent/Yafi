app.todoStore.on('change', function(){
  var items = app.todoStore.getState().items;
  var taskListElement = document.getElementById('taskList');
  taskListElement.innerHTML = '';
  for(var key in items){
    var item = items[key];
    taskListElement.innerHTML += '<li>' + item.text + '</li>';
  }
});
