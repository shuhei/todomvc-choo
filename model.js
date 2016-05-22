const xtend = require('xtend')

const STORAGE_ID = 'todos-choo'
const save = (action, state, send) => {
  const data = {
    counter: state.counter,
    todos: state.todos
  }
  localStorage.setItem(STORAGE_ID, JSON.stringify(data))
}

const init = (send) => {
  setTimeout(() => {
    const json = localStorage.getItem(STORAGE_ID)
    if (json) {
      send('init', { payload: JSON.parse(json) })
    }
  }, 1)
}

module.exports = {
  state: {
    // UI state
    editing: null,
    name: '',
    // real state
    counter: 0,
    todos: []
  },
  reducers: {
    init: (action, state) => ({ counter: action.payload.counter, todos: action.payload.todos }),
    updateNew: (action, state) => ({ name: action.payload }),
    add: (action, state) => ({
      counter: state.counter + 1,
      name: '',
      todos: state.todos.concat({ id: state.counter, name: state.name, done: false })
    }),
    toggle: (action, state) => ({
      todos: state.todos.map(todo => {
        if (todo.id === action.payload) {
          return xtend({}, todo, { done: !todo.done })
        } else {
          return todo
        }
      })
    }),
    edit: (action, state) => ({ editing: action.payload }),
    cancelEditing: (action, state) => ({ editing: null }),
    update: (action, state) => ({
      editing: null,
      todos: state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return xtend({}, todo, { name: action.payload.name })
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
        todos: state.todos.map(todo => xtend({}, todo, { done: !allDone }))
      }
    }
  },
  effects: {
    add: save,
    toggle: save,
    update: save,
    delete: save,
    clearCompleted: save,
    toggleAll: save
  },
  subscriptions: [init]
}
