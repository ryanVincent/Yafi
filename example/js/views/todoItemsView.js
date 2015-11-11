app.todoStore.on('change', function(){
  var items = app.todoStore.getState().items;
  var taskListElement = document.getElementById('taskList');
  taskListElement.innerHtml = '';
  for(var key in items){
    var item = items[key];
    taskListElement.innerHtml += '<li>' + item.text + '</li>';
  }
});
