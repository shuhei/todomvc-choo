const xtend = require('xtend')

const STORAGE_ID = 'todos-choo'
const keysToSave = ['counter', 'todos']

const getState = () => {
  const json = localStorage.getItem(STORAGE_ID)
  if (json) {
    return JSON.parse(json)
  } else {
    return null;
  }
}

const saveState = (state) => {
  localStorage.setItem(STORAGE_ID, JSON.stringify(state))
}

const init = (send, done) => {
  try {
    const state = getState()
    if (state) {
      send('init', { payload: state }, done)
    } else {
      done()
    }
  } catch (e) {
    done(e)
  }
}

const equalProps = (keys, state, prev) => keys.reduce(
  (acc, key) => acc && state[key] === prev[key],
  true
)
const pick = (keys, state) => keys.reduce((acc, key) => {
  acc[key] = state[key]
  return acc
}, {})

module.exports = {
  state: {
    // UI state
    editing: null,
    name: '',
    filter: '',
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
    },
    filter: (action, state) => ({ filter: action.payload })
  },

  subscriptions: [init],

  // This is not for the model. But I put this here to colocate it with other model functions.
  onStateChange: (data, state, prev, caller, createSend) => {
    if (!equalProps(keysToSave, state, prev)) {
      saveState(pick(keysToSave, state))
    }
  }
}
