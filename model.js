module.exports = {
  state: {
    counter: 0,
    editing: null,
    name: '',
    todos: []
  },
  reducers: {
    updateNew: (action, state) => ({ name: action.payload }),
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
    edit: (action, state) => ({
      editing: action.payload
    }),
    update: (action, state) => ({
      editing: null,
      todos: state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return Object.assign({}, todo, { name: action.payload.name })
        } else {
          return todo
        }
      })
    }),
    cancelEditing: (action, state) => ({
      editing: null
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
}
