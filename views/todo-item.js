var html = require('choo/html')

module.exports = function todoItemView (todo, editing, send) {
  return html`
    <li class=${classList({ completed: todo.done, editing: editing })}>
      <div class="view">
        <input
          type="checkbox"
          class="toggle"
          checked="${todo.done}"
          onchange=${toggle(todo, send)}
        />
        <label ondblclick=${edit(todo, send)}>${todo.name}</label>
        <button
          class="destroy"
          onclick=${destroy(todo, send)}
        ></button>
      </div>
      <input
        class="edit"
        value=${todo.name}
        onkeydown=${handleEditKeydown(todo, send)}
        onblur=${update(todo, send)}
      />
    </li>
  `
}

function toggle (todo, send) {
  return function (e) {
    send('todos:toggle', { payload: todo.id })
  }
}

function edit (todo, send) {
  return function (e) {
    send('todos:edit', { payload: todo.id })
  }
}

function destroy (todo, send) {
  return function (e) {
    send('todos:delete', { payload: todo.id })
  }
}

function update (todo, send) {
  return function (e) {
    var payload = { id: todo.id, name: e.target.value }
    send('todos:update', { payload: payload })
  }
}

function handleEditKeydown (todo, send) {
  return function (e) {
    if (e.keyCode === 13) { // Enter
      update(todo, send)(e)
    } else if (e.code === 27) { // Escape
      send('todos:cancelEditing')
    }
  }
}

function classList (classes) {
  return Object.keys(classes).reduce(function (acc, k) {
    if (classes[k]) {
      acc.push(k)
    }
    return acc
  }, []).join(' ')
}
