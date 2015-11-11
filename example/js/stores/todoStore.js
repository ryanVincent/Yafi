var app = app || {};

app.todoStore = new Store(app.dispatcher);

app.todoStore.setInitialState({
  currentId: 1,
  items: {}
});

app.todoStore.addDispatchListener(function(action){
  switch(action.type){
    case "ADD_ITEM":
      app.todoStore.addItem(action.payload);
      break;
  }
})

app.todoStore.addItem = function(item){
  var state = app.todoStore.getState();
  item.id = state.currentId;
  var items = {};
  items[item.id] = item;
  app.todoStore.setState({items: items});
  app.todoStore.setState({currentId: item.id + 1})
  app.todoStore.emit('change');
};
