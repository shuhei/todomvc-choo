var html = require('choo/html')

module.exports = function footerView (todos, prev, send) {
  var activeCount = todos.items.filter(function (todo) {
    return !todo.done
  }).length
  var someDone = todos.items.some(isDone)

  return html`
    <footer class="footer">
      <span class="todo-count">
        <strong>${activeCount}</strong>
        item${todos.items.length === 1 ? '' : 's'} left
      </span>
      <ul class="filters">
        ${filterButton('All', '', todos, send)}
        ${filterButton('Active', 'active', todos, send)}
        ${filterButton('Completed', 'completed', todos, send)}
      </ul>
      ${someDone ? clearCompletedButton(send) : ''}
    </footer>
  `
}

function filterButton (name, filter, state, send) {
  return html`
    <li>
      <a
        href="#"
        onclick=${applyFilter(filter, send)}
        class=${selectedClass(state.filter, filter)}
      >${name}</a>
    </li>
  `
}

function clearCompletedButton (send) {
  return html`
    <button
      class="clear-completed"
      onclick=${clearCompleted(send)}
    >Clear completed</button>
  `
}

function clearCompleted(send) {
  return function () {
    send('todos:clearCompleted')
  }
}

function selectedClass (selectedFilter, filter) {
  return selectedFilter === filter ? 'selected' : ''
}

function applyFilter (filter, send) {
  return function (e) {
    send('todos:filter', { payload: filter })
    e.preventDefault()
  }
}

function isDone(todo) {
  return todo.done
}
