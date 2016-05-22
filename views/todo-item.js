const choo = require('choo')

const update = (e, todo, send) => send('update', { payload: { id: todo.id, name: e.target.value } })

const handleEditKeydown = (e, todo, send) => {
  if (e.code === 'Enter') {
    update(e, todo, send)
  } else if (e.code === 'Escape') {
    send('cancelEditing');
  }
}

const classList =
  classes => Object.keys(classes).reduce((acc, k) => classes[k] ? acc.push(k) && acc : acc, []).join(' ')

const todoItemView = (todo, editing, send) => choo.view`
  <li class=${classList({ completed : todo.done, editing: editing })}>
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        checked="${todo.done}"
        onchange=${e => send('toggle', { payload: todo.id })} />
      <label ondblclick=${e => send('edit', { payload: todo.id })}>${todo.name}</label>
      <button
        class="destroy"
        onclick=${e => send('delete', { payload: todo.id })}
        ></button>
    </div>
    <input
      class="edit"
      value=${todo.name}
      onkeydown=${e => handleEditKeydown(e, todo, send)}
      onblur=${e => update(e, todo, send)} />
  </li>
`

module.exports = todoItemView
