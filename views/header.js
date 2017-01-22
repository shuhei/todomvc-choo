var html = require('choo/html')

module.exports = function headerView (todos, prev, send) {
  return html`
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
        autofocus
        placeholder="What needs to be done?"
        onkeydown=${addTodo}
      />
    </header>
  `

  function addTodo (e) {
    if (e.keyCode === 13) {
      send('todos:add', { name: e.target.value })
      e.target.value = ''
    }
  }
}
