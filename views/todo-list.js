const html = require('choo/html')
const todoItemView = require('./todo-item')

function filterTodos (items, filter) {
  switch (filter) {
    case 'active': return items.filter(todo => !todo.done)
    case 'completed': return items.filter(todo => todo.done)
    default: return items
  }
}

function filteredTodos (state, prev, send) {
  return filterTodos(state.items, state.filter).map(function (todo) {
    return todoItemView(todo, todo.id === state.editing, send)
  })
}

function todoListView (state, prev, send) {
  return html`
    <ul class="todo-list">${filteredTodos(state, prev, send)}</ul>
  `
}

module.exports = todoListView
