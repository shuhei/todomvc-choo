var html = require('choo/html')

module.exports = function footerView (state, prev, send) {
  var activeCount = state.items.filter(function (todo) {
    return !todo.done
  }).length
  var hasDone = state.items.filter(function (todo) {
    return todo.done
  }).length > 0

  return html`
    <footer class="footer">
      <span class="todo-count">
        <strong>${activeCount}</strong>
        item${state.items.length === 1 ? '' : 's'} left
      </span>
      <ul class="filters">
        ${filterButton('All', '', state.filter, send)}
        ${filterButton('Active', 'active', state.filter, send)}
        ${filterButton('Completed', 'completed', state.filter, send)}
      </ul>
      ${hasDone ? clearCompletedButton(send) : ''}
    </footer>
  `
}

function filterButton (name, filter, currentFilter, send) {
  var klass = filter === currentFilter ? 'selected' : ''

  return html`
    <li>
      <a href="#" class=${klass} onclick=${applyFilter}>${name}</a>
    </li>
  `

  function applyFilter () {
    send('todos:filter', { filter: filter })
  }
}

function clearCompletedButton (send) {
  return html`
    <button
      class="clear-completed"
      onclick=${clearCompleted}
    >Clear completed</button>
  `

  function clearCompleted () {
    send('todos:clearCompleted')
  }
}
