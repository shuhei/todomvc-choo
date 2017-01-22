var html = require('choo/html')

module.exports = function headerView (todos, prev, send) {
  return html`
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        value=${todos.name}
        oninput=${updateNew(send)}
        onkeydown=${addTodo(send)}
        autofocus
      />
    </header>
  `
}

function updateNew (send) {
  return function (e) {
    send('todos:updateNew', { payload: e.target.value })
  }
}

function addTodo (send) {
  return function (e) {
    if (e.keyCode === 13) {
      send('todos:add')
    }
  }
}
