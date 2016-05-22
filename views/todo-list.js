const choo = require('choo')
const todoItemView = require('./todo-item')

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'active': return todos.filter(todo => !todo.done)
    case 'completed': return todos.filter(todo => todo.done)
    default: return todos
  }
}

const filteredTodos = (state, send) =>
  filterTodos(state.todos, state.filter).map(todo => todoItemView(todo, todo.id === state.editing, send))

const todoListView = (state, send) => choo.view`
  <ul class="todo-list">${filteredTodos(state, send)}</ul>
`

module.exports = todoListView
