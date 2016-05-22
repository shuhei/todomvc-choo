const choo = require('choo')
const todoListView = require('./todo-list')

const clearCompletedButton = (send) => choo.view`
  <button class="clear-completed" onclick=${e => send('clearCompleted')}>Clear completed</button>
`

const selectedClass = (params, filter) => params.filter === filter ? 'selected' : ''

module.exports = (params, state, send) => choo.view`
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        value=${state.name}
        oninput=${e => send('updateNew', { payload: e.target.value })}
        onkeydown=${e => e.code === 'Enter' && send('add') || true}
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
      ${todoListView(params, state, send)}
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>${state.todos.filter(todo => !todo.done).length}</strong>
        item${state.todos.length === 1 ? '' : 's'} left
      </span>
      <ul class="filters">
        <li><a href="/" class=${selectedClass(params, '')}>All</a></li>
        <li><a href="/active" class=${selectedClass(params, 'active')}>Active</a></li>
        <li><a href="/completed" class=${selectedClass(params, 'completed')}>Completed</a></li>
      </ul>
      ${state.todos.some(todo => todo.done) ? clearCompletedButton(send) : ''}
    </footer>
  </section>
`
