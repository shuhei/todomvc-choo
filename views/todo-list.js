var html = require('choo/html')
var todoItemView = require('./todo-item')

module.exports = function todoListView (todos, prev, send) {
  var items = filterTodos(todos.items, todos.filter)
  var views = items.map(function (todo) {
    return todoItemView(todo, todo.id === todos.editing, send)
  })

  return html`
    <section class="main">
      <input
        class="toggle-all"
        type="checkbox"
        checked=${todos.items.every(isDone)}
        onchange=${toggleAll(send)}
      />
      <label for="toggle-all" style="display: none;">Mark all as complete</label>
      <ul class="todo-list">${views}</ul>
    </section>
  `
}

function toggleAll (send) {
  return function () {
    send('todos:toggleAll')
  }
}

function filterTodos (items, filter) {
  switch (filter) {
    case 'active': return items.filter(isNotDone)
    case 'completed': return items.filter(isDone)
    default: return items
  }
}

function isDone (todo) {
  return todo.done
}

function isNotDone (todo) {
  return !todo.done
}
