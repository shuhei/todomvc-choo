const choo = require('choo')

const app = choo()
app.model({
  state: {
    counter: 3,
    name: '',
    todos: [
      { id: 0, name: 'Go to nodeschool', done: false },
      { id: 1, name: 'Learn Node.js', done: false },
      { id: 2, name: 'Talk with people', done: false }
    ]
  },
  reducers: {
    update: (action, state) => ({ name: action.payload }),
    add: (action, state) => ({
      counter: state.counter + 1,
      name: '',
      todos: [...state.todos, { id: state.counter, name: state.name, done: false }]
    }),
    toggle: (action, state) => ({
      todos: state.todos.map(todo => {
        if (todo.id === action.payload) {
          return Object.assign({}, todo, { done: !todo.done })
        } else {
          return todo
        }
      })
    }),
    delete: (action, state) => ({
      todos: state.todos.filter(todo => todo.id !== action.payload)
    }),
    clearCompleted: (action, state) => ({
      todos: state.todos.filter(todo => !todo.done)
    }),
    toggleAll: (action, state) => {
      const allDone = state.todos.every(todo => todo.done)
      return {
        todos: state.todos.map(todo => Object.assign({}, todo, { done: !allDone }))
      }
    }
  },
  effects: {
  }
})

const todoView = (todo, send) => choo.view`
  <li class=${todo.done ? 'completed' : ''}>
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        checked="${todo.done}"
        onchange=${e => send('toggle', { payload: todo.id })} />
      <label>${todo.name}</label>
      <button class="destroy" onclick=${e => send('delete', { payload: todo.id })}></button>
      <input class="edit" value=${todo.name} />
    </div>
  </li>
`

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'active': return todos.filter(todo => !todo.done)
    case 'completed': return todos.filter(todo => todo.done)
    default: return todos
  }
}

const clearCompletedButton = (send) => choo.view`
  <button class="clear-completed" onclick=${e => send('clearCompleted')}>Clear completed</button>
`

const mainView = (params, state, send) => choo.view`
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        value=${state.name}
        oninput=${e => send('update', { payload: e.target.value })}
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
      <ul class="todo-list">${filterTodos(state.todos, params.filter).map(todo => todoView(todo, send))}</ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>${state.todos.filter(todo => !todo.done).length}</strong>
        item${state.todos.length === 1 ? '' : 's'} left
      </span>
      <ul class="filters">
        <li><a href="/">All</a></li>
        <li><a href="/active">Active</a></li>
        <li><a href="/completed">Completed</a></li>
      </ul>
      ${state.todos.some(todo => todo.done) ? clearCompletedButton(send) : ''}
    </footer>
  </section>
`

app.router((route) => [
  route('/:filter', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
