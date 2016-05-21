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
      todos: [...state.todos, { id: state.counter, name: action.payload, done: false }]
    }),
    toggle: (action, state) => ({
      todos: state.todos.map(todo => {
        if (todo.id === action.payload) {
          return { id: todo.id, name: todo.name, done: !todo.done }
        } else {
          return todo
        }
      })
    }),
    delete: (action, state) => ({
      todos: state.todos.filter(todo => todo.id !== action.payload)
    })
  },
  effects: {
  }
})

const todoView = (todo, send) => choo.view`
  <li style="${todo.done ? 'text-decoration: line-through' : ''}">
    <input
      type="checkbox"
      checked="${todo.done}"
      onchange=${e => send('toggle', { payload: todo.id })} />
    <span>${todo.name}</span>
    <button onclick=${e => send('delete', { payload: todo.id })}>Delete</button>
  </li>
`

const mainView = (params, state, send) => choo.view`
  <main class="app" style="font-family: sans-serif; font-size: 2em;">
    <h1>todos</h1>
    <label>Add todo:</label>
    <input
      type="text"
      placeholder="What needs to be done?"
      value=${state.name}
      onchange=${e => send('update', { payload: e.target.value })}
      onkeydown=${e => e.code === 'Enter' && send('add', { payload: e.target.value }) || true}/>
    <ul>${state.todos.map(todo => todoView(todo, send))}</ul>
    <p>${state.todos.filter(todo => !todo.done).length} items left</p>
  </main>
`

app.router((route) => [
  route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
