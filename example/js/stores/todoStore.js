var app = app || {};

app.todoStore = new Store(app.dispatcher);

app.todoStore.setInitialState({
  currentId: 1,
  items: {}
});

app.todoStore.addItem = function(item){
  item.id = currentId;
  items[item.id] = item;
  currentId += 1;
  app.todoStore.emit('change');
};
