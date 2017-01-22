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
    add: add,
    toggle: toggle,
    edit: edit,
    cancelEditing: cancelEditing,
    update: update,
    destroy: destroy,
    clearCompleted: clearCompleted,
    toggleAll: toggleAll,
    filter: filter
  }
}

// Reducers

function add (state, data) {
  var newItem = {
    id: state.counter,
    name: data.name,
    done: false
  }
  return {
    counter: state.counter + 1,
    items: state.items.concat(newItem)
  }
}

function toggle (state, data) {
  return {
    items: state.items.map(function (todo) {
      if (todo.id === data.id) {
        return xtend({}, todo, { done: !todo.done })
      } else {
        return todo
      }
    })
  }
}

function edit (state, data) {
  return { editing: data.id }
}

function cancelEditing (state, data) {
  return { editing: null }
}

function update (state, data) {
  return {
    editing: null,
    items: state.items.map(function (todo) {
      if (todo.id === data.id) {
        return xtend({}, todo, { name: data.name })
      } else {
        return todo
      }
    })
  }
}

function destroy (state, data) {
  return {
    items: state.items.filter(function (todo) {
      return todo.id !== data.id
    })
  }
}

function clearCompleted (state, data) {
  return {
    items: state.items.filter(function (todo) {
      return !todo.done
    })
  }
}

function toggleAll (state, data) {
  var allDone = state.items.filter(function (todo) {
    return todo.done
  }).length === state.items.length

  return {
    items: state.items.map(function (todo) {
      return xtend({}, todo, { done: !allDone })
    })
  }
}

function filter (state, data) {
  return { filter: data.filter }
}
