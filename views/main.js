const choo = require('choo')
const todoListView = require('./todo-list')

const clearCompletedButton = (send) => choo.view`
  <button class="clear-completed" onclick=${e => send('clearCompleted')}>Clear completed</button>
`

const selectedClass = (state, filter) => state.filter === filter ? 'selected' : ''

const filterButton = (name, filter, state, send) => choo.view`
  <li><a href="#" onclick=${e => send('filter', { payload: filter })} class=${selectedClass(state, filter)}>${name}</a></li>
`

module.exports = (params, state, send) => choo.view`
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        value=${state.name}
        oninput=${e => send('updateNew', { payload: e.target.value })}
        onkeydown=${e => e.keyCode === 13 && send('add') || true}
        autofocus
        />
    </header>
    <section class="main">
      <input
        class="toggle-all"
        type="checkbox"
        checked=${state.todos.every(todo => todo.done)}
        onchange=${e => send('toggleAll')} />
      <label for="toggle-all">Mark all as complete</label>
      ${todoListView(state, send)}
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>${state.todos.filter(todo => !todo.done).length}</strong>
        item${state.todos.length === 1 ? '' : 's'} left
      </span>
      <ul class="filters">
        ${filterButton('All', '', state, send)}
        ${filterButton('Active', 'active', state, send)}
        ${filterButton('Completed', 'completed', state, send)}
      </ul>
      ${state.todos.some(todo => todo.done) ? clearCompletedButton(send) : ''}
    </footer>
  </section>
`
