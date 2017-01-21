const choo = require('choo')
const html = require('choo/html')
const todoListView = require('./todo-list')

function clearCompletedButton(send) {
  return html`
    <button class="clear-completed" onclick=${e => send('todos:clearCompleted')}>Clear completed</button>
  `
}

function selectedClass(state, filter) {
  return state.filter === filter ? 'selected' : ''
}

function filterButton(name, filter, state, send) {
  return html`
    <li><a href="#" onclick=${e => send('todos:filter', { payload: filter })} class=${selectedClass(state, filter)}>${name}</a></li>
  `
}

module.exports = function (state, prev, send) {
  var todos = state.todos
  return html`
    <div id="root">
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input
            class="new-todo"
            placeholder="What needs to be done?"
            value=${todos.name}
            oninput=${e => send('todos:updateNew', { payload: e.target.value })}
            onkeydown=${e => e.keyCode === 13 && send('todos:add') || true}
            autofocus
            />
        </header>
        <section class="main">
          <input
            class="toggle-all"
            type="checkbox"
            checked=${todos.items.every(todo => todo.done)}
            onchange=${e => send('todos:toggleAll')} />
          <label for="toggle-all" style="display: none;">Mark all as complete</label>
          ${todoListView(todos, prev, send)}
        </section>
        <footer class="footer">
          <span class="todo-count">
            <strong>${todos.items.filter(todo => !todo.done).length}</strong>
            item${todos.items.length === 1 ? '' : 's'} left
          </span>
          <ul class="filters">
            ${filterButton('All', '', todos, send)}
            ${filterButton('Active', 'active', todos, send)}
            ${filterButton('Completed', 'completed', todos, send)}
          </ul>
          ${todos.items.some(todo => todo.done) ? clearCompletedButton(send) : ''}
        </footer>
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>choo by <a href="https://yoshuawuyts.com/">Yoshua Wuyts</a></p>
        <p>Created by <a href="http://shuheikagawa.com">Shuhei Kagawa</a></p>
      </footer>
    </div>
  `
}
