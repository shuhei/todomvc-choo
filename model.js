var xtend = require('xtend')

module.exports = {
  namespace: 'todos',
  state: {
    // UI state
    editing: null,
    filter: '',
    // real state
    counter: 0,
    items: []
  },
  reducers: {
    init: init,
    add: add,
    toggle: toggle,
    edit: edit,
    cancelEditing: cancelEditing,
    update: update,
    delete: deleteItem,
    clearCompleted: clearCompleted,
    toggleAll: toggleAll,
    filter: filter
  }
}

// Reducers

function init (state, action) {
  return { counter: action.payload.counter, items: action.payload.items }
}

function add (state, action) {
  var newItem = {
    id: state.counter,
    name: action.payload,
    done: false
  }
  return {
    counter: state.counter + 1,
    items: state.items.concat(newItem)
  }
}

function toggle (state, action) {
  return {
    items: state.items.map(function (todo) {
      if (todo.id === action.payload) {
        return xtend({}, todo, { done: !todo.done })
      } else {
        return todo
      }
    })
  }
}

function edit (state, action) {
  return { editing: action.payload }
}

function cancelEditing (state, action) {
  return { editing: null }
}

function update (state, action) {
  return {
    editing: null,
    items: state.items.map(function (todo) {
      if (todo.id === action.payload.id) {
        return xtend({}, todo, { name: action.payload.name })
      } else {
        return todo
      }
    })
  }
}

function deleteItem (state, action) {
  return {
    items: state.items.filter(function (todo) {
      return todo.id !== action.payload
    })
  }
}

function clearCompleted (state, action) {
  return {
    items: state.items.filter(function (todo) {
      return !todo.done
    })
  }
}

function toggleAll (state, action) {
  var allDone = state.items.filter(function (todo) {
    return todo.done
  }).length === state.items.length

  return {
    items: state.items.map(function (todo) {
      return xtend({}, todo, { done: !allDone })
    })
  }
}

function filter (state, action) {
  return { filter: action.payload }
}
